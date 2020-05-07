import re
import string
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk import word_tokenize
from keras.preprocessing.text import Tokenizer

def clean_string(string):
    """
    Original can be found here: https://github.com/yoonkim/CNN_sentence/blob/master/process_data.py
    """
    string = re.sub(r"[^A-Za-z0-9(),!?\'\`]", " ", string)
    string = re.sub(r"\'s", " \'s", string)
    string = re.sub(r"\'ve", " \'ve", string)
    string = re.sub(r"n\'t", " n\'t", string)
    string = re.sub(r"\'re", " \'re", string)
    string = re.sub(r"\'d", " \'d", string)
    string = re.sub(r"\'ll", " \'ll", string)
    string = re.sub(r",", " , ", string)
    string = re.sub(r"!", " ! ", string)
    string = re.sub(r"\(", " \( ", string)
    string = re.sub(r"\)", " \) ", string)
    string = re.sub(r"\?", " \? ", string)
    string = re.sub(r"\s{2,}", " ", string)

    return string.strip().lower()

def tokenization_and_proprocessing(text, vocab_size):
    """
    Original can be found here: https://github.com/nateraw/Tensorflow-for-NLP/blob/master/Episode%208/data_helper.py
    """
    # Will hold clean text
    text_clean = []

    # List of stop words/ unwanted words
    stop = stopwords.words('english') + list(string.punctuation)

    for t in text:
        text_clean.append(" ".join([i for i in word_tokenize(t.lower()) if i not in stop and i[0] != "'"]))

    # Instantiate tokenizer
    T = Tokenizer(num_words=vocab_size)

    # Fit the tokenizer with text
    T.fit_on_texts(text_clean)

    # Turn our input text into sequences of index integers
    data = T.texts_to_sequences(text_clean)

    word_to_idx = T.word_index
    idx_to_word = {v: k for k, v in word_to_idx.items()}

    return data, word_to_idx, idx_to_word, T