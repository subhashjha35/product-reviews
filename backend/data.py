import gzip
import shutil
import os
import wget

def download(url: str, file: str):
    """
    Download file from <url>

    :param url: URL to file
    :param file: Local file path
    """
    if not os.path.isfile(file):
        print('Downloading ' + file + '...')
        wget.download(url, file)
        print('Download Finished')
        with gzip.open(file, 'rb') as f_in, \
                open(file[:-3], 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)