## Install
```
virtualenv --no-site-packages --distribute venv
source venv/bin/activate
pip install -r requirements.txt
npm install
sudo npm install -g gulp
gulp
python manage.py migrate
python manage.py runserver
```

## Config

To integrate with the Discogs API (currently allows fetching record information by barcode), a config file must be created at server/record/config.py containing:
```
discogs_token = “discogs_api_token_goes_here”
discogs_key = "discogs_key_goes_here"
discogs_secret = "discogs_secret_goes_here"
```
