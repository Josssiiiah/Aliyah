import os 

import pinecone 
from langchain.document_loaders import UnstructuredURLLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone

urls = [
    "https://cs.stanford.edu/people/nick/py/",
    "https://cs.stanford.edu/people/nick/py/python-about.html",
    "https://cs.stanford.edu/people/nick/py/python-interpreter.html",
    "https://cs.stanford.edu/people/nick/py/python-command.html",
    "https://cs.stanford.edu/people/nick/py/python-keyboard.html",
    "https://cs.stanford.edu/people/nick/py/python-style1.html",
    "https://cs.stanford.edu/people/nick/py/python-style-readable.html",
    "https://cs.stanford.edu/people/nick/py/python-style-decomposition.html",
    "https://cs.stanford.edu/people/nick/py/python-var.html",
    "https://cs.stanford.edu/people/nick/py/python-math.html",
    "https://cs.stanford.edu/people/nick/py/python-function.html",
    "https://cs.stanford.edu/people/nick/py/python-debugging.html",
    "https://cs.stanford.edu/people/nick/py/python-doctest.html",
    "https://cs.stanford.edu/people/nick/py/python-for.html",
    "https://cs.stanford.edu/people/nick/py/python-while.html",
    "https://cs.stanford.edu/people/nick/py/python-if.html",
    "https://cs.stanford.edu/people/nick/py/python-boolean.html",
    "https://cs.stanford.edu/people/nick/py/python-range.html",
    "https://cs.stanford.edu/people/nick/py/python-string.html",
    "https://cs.stanford.edu/people/nick/py/python-print.html",
    "https://cs.stanford.edu/people/nick/py/python-input.html",
    "https://cs.stanford.edu/people/nick/py/python-file.html",
    "https://cs.stanford.edu/people/nick/py/python-list.html",
    "https://cs.stanford.edu/people/nick/py/python-main.html",
    "https://cs.stanford.edu/people/nick/py/python-dict.html",
    "https://cs.stanford.edu/people/nick/py/python-nocopy.html",
    "https://cs.stanford.edu/people/nick/py/python-tuple.html",
    "https://cs.stanford.edu/people/nick/py/python-map-lambda.html",
    "https://cs.stanford.edu/people/nick/py/python-comprehension.html",
    "https://cs.stanford.edu/people/nick/py/python-sort.html",
]

loader = UnstructuredURLLoader(urls=urls)
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=500)
docs = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings(openai_api_key="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")

pinecone.init(
    api_key="",  # find at app.pinecone.io
    environment=""  # next to api key in console
)

index_name = "aliyah"

docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name)