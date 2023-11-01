from gensim.models.word2vec import Word2Vec
from sklearn.base import BaseEstimator, TransformerMixin
import time
from tqdm import tqdm
from AIAnalyzer.LoadData import *
# from nltk.corpus import brown, inaugural, genesis, movie_reviews, reuters
import nltk
import pickle
import numpy as np
from multiprocessing import Pool

class WVTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, vsize = 96, wsize = 3, wordLimit = 1000):
        self.vsize = vsize
        self.wsize = wsize
        self.wordLimit = wordLimit

    def fit(self, X):
        self.w2v = Word2Vec(X, vector_size=self.vsize, window=self.wsize, min_count=1, compute_loss=True, seed=1)
        return self
    def save(self, path):
        self.w2v.save(path)
    def load(self, path):
        self.w2v = Word2Vec.load(path)
    def transform(self, X):
        return self.transformDF(X)
    def transformDF(self, df, flatten = True):
        tokens = nltk.word_tokenize(df)
        vectors = []
        for token in tokens:
            if not token in self.w2v.wv.index_to_key:
                tqdm.write(f"[{time.asctime()}] Failed to find token {token}")
                continue
            vectors.append(self.w2v.wv[token])
        vectors = self.padTokens(vectors, self.wordLimit)
        
        out = np.array(vectors)
        if flatten:
            out = np.reshape(out, (out.shape[0] * out.shape[1]))
        return out
    def transformDF2(self, *df, flatten = False):
        df = ["".join(i) for i in zip(*df)]
        out = np.zeros((len(df), self.vsize * self.wordLimit), dtype=np.float32)
        with Pool(4) as pool:
            for i, article in enumerate(pool.imap(self.transformDF, df, chunksize=max(len(df)//4, 1))):
                out[i] = article
        out = np.array(out)
        return out
    def padTokens(self, tokens, length):
        tokenLen = len(tokens)
        if tokenLen < length:
            diff = length - tokenLen
            tokens.extend([np.zeros((self.vsize,), dtype=np.float32) for i in range(diff)])
            return tokens
        return tokens[:length]



def getTrainedW2VTransofrmer(path="W2VTransformer.model") -> WVTransformer:
    wv = WVTransformer()
    wv.load(path)
    return wv

def getBatchedTokens(batchSize, maxSize = 20000):
    articles = getBatchDataset(batchSize, maxSize)

    for article in articles:
        text = article["text"].tolist()
        out = []
        [out.extend(nltk.word_tokenize(i)) for i in text]
        yield out

if __name__ == "__main__":
    v = getBatchedTokens(5)
    model = getTrainedW2VTransofrmer()
    print(len(model.w2v.wv.key_to_index))
    model.w2v.train(v, total_examples=20000, epochs=model.w2v.epochs)
    print(len(model.w2v.wv.key_to_index))

# t = getTrainedW2VTransofrmer()
# df = getNewsDataframe()
# first = df.tail(1)
# tokens = nltk.word_tokenize(first["text"].loc[first.index[0]])
# print(tokens)
# [print(i in t.w2v.wv.index_to_key) for i in tokens]
# print(df["text"].tolist())
# start = time.time()
# out = t.transformDF(df["text"].tolist())
# with open("transformed.vector", "wb") as file:
#     pickle.dump(out, file)
# print("done saving")
# end = time.time() - start

# # print(out)
# print(f"Finished in {end}")



#    def transformDF(self, df, flatten = True, maxWords = 1000):
 
#         tokens = nltk.word_tokenize(df)
#         vectors = []
#         for token in tokens:
#             if not token in self.w2v.wv.index_to_key:
#                 continue
#             vectors.append(self.w2v.wv[token])
#         vectors = self.padTokens(vectors, maxWords)
        
#         out = np.array(vectors)
#         if flatten:
#             out = np.reshape(out, (out.shape[0] * out.shape[1]))
#         return out
#     def transformDF2(self, *df, maxWords = 1000, flatten = False):
#         df = ["".join(i) for i in zip(*df)]
#         with Pool(1) as pool:
#             out = list(process_map(self.transformDF, df, max_workers = 10))
#         out = np.array(out)
#         return out


    # def transformDF(self, df, flatten = True, maxWords = 1000):
 
    #     tokens = nltk.word_tokenize(df)
    #     vectors = []
    #     for token in tokens:
    #         if not token in self.w2v.wv.index_to_key:
    #             continue
    #         vectors.append(self.w2v.wv[token])
    #     vectors = self.padTokens(vectors, maxWords)
        
    #     out = np.array(vectors)
    #     if flatten:
    #         out = np.reshape(out, (out.shape[0] * out.shape[1]))
    #     return out
    # def transformDF2(self, *df, maxWords = 1000, flatten = False):
    #     df = ["".join(i) for i in zip(*df)]
    #     articles = []
    #     for article in tqdm(df):
    #         tokens = nltk.word_tokenize(article)
    #         vectors = []
    #         for token in tokens:
    #             if not token in self.w2v.wv.index_to_key:
    #                 continue
    #             vectors.append(self.w2v.wv[token])
    #         vectors = self.padTokens(vectors, maxWords)
    #         articles.append(vectors)
        
    #     out = np.array(articles)
    #     if flatten:
    #         out = np.reshape(out, (out.shape[0], out.shape[1] * out.shape[2]))
    #     return out












# Run This if New Model Needs To Be Trained

# for corp in (brown, inaugural, genesis, movie_reviews, reuters):
#     print(f"working on {corp}")
#     for file in corp.fileids():
#         sents.extend(corp.sents(file))
#     with open("./sentences.list", "wb") as file:
#         pickle.dump(sents, file)
# with open("./sentences.list", "rb") as file:
#     sents = pickle.load(file)

# wvt.fit(sents)
# wvt.save("W2VTransformer.model")