## Dependencies:
* Django - via pip
* discogs-client - via pip
* Gulp - via NPM (globally)

## Install
```
pip install -r requirements.txt
npm install
npm install -g gulp
gulp
python manage.py migrate
python manage.py runserver
```

## Config

To integrate with the Discogs API (currently allows fetching record information by barcode), a config file must be created at server/record/config.py containing:
```
discogs_token = “discogs_api_token_goes_here”
```
