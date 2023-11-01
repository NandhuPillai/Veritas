import pickle
import sys
from sklearn.ensemble import RandomForestClassifier
from AIAnalyzer.ExtractText import getDatasetFromURL
# import pyperclip as pp
import pandas as pd
from AIAnalyzer.LoadData import processWebData

def getPrediction(URL: str):
    with open(f"{__file__}/../models/newsDetectorV1.model", "rb") as file:
        classifier: RandomForestClassifier = pickle.load(file)
    
    dataset, title, text = getDatasetFromURL(URL)
    res = classifier.predict_proba(dataset.features)
    print(res)
    return res[0,1]



if __name__ == "__main__":
    with open(f"{__file__}/../models/newsDetectorV1.model", "rb") as file:
        classifier: RandomForestClassifier = pickle.load(file)

    # numTests = 150
    # rawData = pd.read_csv(f"{__file__}/../datasets/True.csv")
    # rawData = rawData.tail(5000).sample(numTests)
    # dataset = processWebData(rawData["title"].to_list(), rawData["text"].to_list())
    dataset, title, text = getDatasetFromURL(sys.argv[1])
    # pp.copy(text)
    print(dataset.features.shape)
    res = classifier.predict(dataset.features)

    # score = classifier.score(dataset.features, [1 for i in range(numTests)])
    print(res)
