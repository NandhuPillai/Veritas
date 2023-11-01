import pandas as pd
import numpy as np
from sklearn.utils import Bunch
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
import nltk
from nltk.corpus import words, reuters
from AIAnalyzer.WVTransformer import getTrainedW2VTransofrmer
import pickle
import re
import time

def getDataset():
    df = getRawData()
    df = df.replace(np.nan, "")
    features = df[["title", "text"]]
    
    target = df[pd.Index(["label"])]

    featureNames = features.columns.to_numpy()

    vectorization1 = TfidfVectorizer(ngram_range=(1,2))
    vectorization2= TfidfVectorizer(ngram_range=(1,2))

    col = ColumnTransformer([("title", vectorization1, "title"),
                             ("text", vectorization2, "text")])
    col.fit(getNewsDataframe())
    featuresV = col.transform(features).toarray()
    
    saveVectors(col)
    dataset = Bunch(features = featuresV, targets = target.to_numpy().flatten(), featureNames = featureNames)
    
    return dataset

def processWebData(titles, texts):
    _titles = [re.sub(r"""[^.,;A-Za-z0-9 ]""", "", title) for title in titles]
    _texts = [re.sub(r"""[^.,;A-Za-z0-9 ]""", "", text) for text in texts]
    df = pd.DataFrame({
        "title": _titles,
        "text": _texts
    })
    # vectorizer = getTrainedW2VTransofrmer()
    # featuresV = vectorizer.transformDF2(df["title"].tolist(), df["text"].tolist(), flatten=True)
    col: ColumnTransformer = loadVectors()
    col.fit(getNewsDataframe())
    featuresV = col.transform(df).toarray()
    return Bunch(features = featuresV)
    

def saveVectors(transformer: ColumnTransformer, name="main"):
    with open(f"{__file__}/../tokenVectors/{name}.vector", "wb") as file:
        pickle.dump(transformer, file)
def loadVectors(name="main"):
    with open(f"{__file__}/../tokenVectors/{name}.vector", "rb") as file:
        return pickle.load(file)
def getNewsDocuments():
    nltk.download("reuters")
    return reuters.words()
def getNewsDataframe():
    nltk.download("reuters")

    # Extract fileids from the reuters corpus
    fileids = reuters.fileids()

    # Initialize empty lists to store categories and raw text
    categories = []
    texts = []
    titles = []

    # Loop through each file id and collect each files categories and raw text
    for file in fileids:
        categories.append(reuters.categories(file))
        text = reuters.raw(file)
        title = re.match(r"(.*\n  )|((.*[\n{2}]){1})", text).group(0)
        titles.append(title)
        texts.append(text)

    # Combine lists into pandas dataframe. reutersDf is the final dataframe. 
    reutersDf = pd.DataFrame({'title':titles, 'text':texts})
    return reutersDf


def getRawData(start = None, end = None):
    dfTrue = pd.read_csv(f"{__file__}/../datasets/True.csv")
    dfFalse = pd.read_csv(f"{__file__}/../datasets/Fake.csv")
    numRows = min(dfTrue.shape[0], dfFalse.shape[0])
    if start != None and end != None:
        start, end = min(start, numRows-1), min(end, numRows)
        dfTrue = dfTrue.iloc[start:end]
        dfFalse = dfFalse.iloc[start:end] 
    
    # Format and Label
    dfTrue["text"] = [i.replace("(Reuters)", "") for i in dfTrue["text"]]
    dfTrue["label"] = 1
    dfFalse["label"] = 0

    # combine and shuffle
    df = pd.concat([dfTrue, dfFalse]).sample(frac=1)
    return df
def getDatasetWithWV(raw):
    df = raw.replace(np.nan, "")
    features = df[["title", "text"]]
    
    target: pd.DataFrame = df[pd.Index(["label"])]

    featureNames = features.columns.to_numpy()

    wvt = getTrainedW2VTransofrmer()

    textV = wvt.transformDF2(features["title"].tolist(), features["text"].tolist(), flatten=True)

    # featuresV = col.transform(features).toarray()
    
    # saveVectors(col)
    dataset = Bunch(features = textV, targets = target.to_numpy().flatten(), featureNames = featureNames)
     
    return dataset

def getBatchDataset(batchSize, maxData = 20000):
    start = 0
    if maxData % batchSize != 0:
        print("[WARNING] Batch size is not a multiple of Data size!")
    while start + batchSize < maxData:
        yield getRawData(start, start + batchSize)
        start += batchSize
    pass


if __name__ == "__main__":
    for i in getBatchDataset(1, 10):
        print(i["text"].tolist()[0])
    
