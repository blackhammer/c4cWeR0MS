import csv
import time

from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields, reqparse

app = Flask(__name__)
CORS(app)

api = Api(app, version='1.0', title='Green Karma API (Climant Impact Rating)',
    description='A protoype API system allowing the storage and retrieval of Climate Impact Rating data for products',
    prefix='/v1'
)

from cloudant.client import Cloudant

# You must overwrite the values in api_access below with those from your service credential, that you created in IBM Cloud IAM for Cloudant.
# The actual values below are to just show the format - and these are no longer valid.
api_access = {
  "apikey": "WGqiaScyleRudh1-zIGuGTSkpdIKY2TpjsJ0G74iToDc",
  "host": "6c709e82-8633-4ceb-9d99-bcc842a6c369-bluemix.cloudantnosqldb.appdomain.cloud",
  "iam_apikey_description": "Auto-generated for key da8f22a4-d0eb-46f4-8945-d401cf424595",
  "iam_apikey_name": "climate-rating-apiaccess",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/8926cd9bc46348adb0dd53354c359ad0::serviceid:ServiceId-4c959bc5-d9b3-451c-b314-bbbde3f8eb79",
  "url": "https://6c709e82-8633-4ceb-9d99-bcc842a6c369-bluemix.cloudantnosqldb.appdomain.cloud",
  "username": "6c709e82-8633-4ceb-9d99-bcc842a6c369-bluemix"
}

client = Cloudant.iam(
    api_access['username'],
    api_access['apikey'],
    connect=True
)

product_ns = api.namespace('product', description='User CIR Product Operations')

# Define the API models we will use (these will show up in the Swagger Specification).

rating = api.model('Rating', {
    'efficiency': fields.Integer(required=False, description='The efficiency-in-use rating (0-9, where 0 is best) of this item'),
    'energy': fields.Float(required=False, description='The energy (J) to produce this item'),
    'CO2': fields.Float(required=False, description='The CO2 released (Kg) to produce this item'),
    'otherGG': fields.Float(required=False, description='The other green house gases released (Kg) to produce this item'),
    'water': fields.Float(required=False, description='The volume of water (litres) to produce this item'),
    'plastic': fields.Float(required=False, description='The amout of plastic (Kg) included in this item'),
    'lifetime': fields.Float(required=False, description='The expected lifetime (years) of this item'),
    'recyclability': fields.Integer(required=False, description='The recyclability rating (0-9, where 0 is best) of this item'),
    'repairability': fields.Integer(required=False, description='The Right to Repair rating (0-9, where 0 is best) of this item')
})

product = api.model('Product', {
    'id': fields.String(readonly=True, description='The unique product registration identifier'),
    'barcode_id': fields.String(required=True, description='The barcode for this product id, in EAN-13 format'),
    'type': fields.String(required=True, description='The type of product'),
    'category': fields.String(required=True, description='The category of this product, with its type'),
    'model': fields.String(required=True, description='The model number of this product'),
    'brand': fields.String(required=True, description='The venfor of this item'),
    'rating_data': fields.Nested(rating)
})

db_name = 'cir-db'

# A Data Access Object to handle the reading and writing of Product records to the Cloudant DB

class ProductDAO(object):
    def __init__(self):
        if db_name in client.all_dbs():
            self.cir_db = client[db_name]
        else:
            # Create the DB and immport the dummy data
            self.cir_db = client.create_database(db_name)
            self.import_data()

    def import_data(self):
        print ("Importing dummy data", end = '', flush=True)
        with open('dummy-data.txt') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count > 0:
                    data = {
                        'barcode_id': row[4],
                        'type': row[0],
                        'category': row[2],
                        'model': row[3],
                        'brand': row[1],
                        'rating_data': {
                            'efficiency': int(row[6]),
                            'energy': float(row[7]) + float(row[8]),
                            'CO2': float(row[13]),
                            'otherGG': float(row[14]),
                            'water': float(row[11]),
                            'plastic': float(row[9]),
                            'lifetime': float(row[10]),
                            'recyclability': int(row[12]),
                            'repairability': int(row[15])
                        }
                    }
                    time.sleep(0.15)     # Have to rate limit it to less than 10 a second, due to free tier
                    self.create(data)
                    print(".", end = '', flush=True)
                line_count += 1
        print ("complete")

    def list(self):
        return [x for x in self.cir_db]

    def get(self, id):
        try:
            my_document = self.cir_db[id]
            my_document['id'] = my_document['barcode_id']
        except KeyError:
            None
        return my_document

    def get_by_filters(self, args):
        my_document = [x for x in self.cir_db]
        for key, value in args.items():
            if value is not None:
                my_document = [x for x in my_document if x[key].lower() == value.lower()]
                if my_document == []:
                    return None
        return my_document

    def get_by_barcode(self, barcode_id):
        # For now this is easy, since id is the same as barcode_id....in the future this would need an
        # index of some such search ability
        try:
            my_document = self.cir_db[barcode_id]
            my_document['id'] = my_document['barcode_id']
        except KeyError:
            None
        return my_document

    def get_by_brand(self, brand):
        my_document = [x for x in self.cir_db if x['brand'].lower() == brand.lower()]
        if my_document == []:
            None
        return my_document

    def get_by_model(self, model):
        my_document = [x for x in self.cir_db if x['model'].lower() == model.lower()]
        if my_document == []:
            None
        return my_document

    def get_by_category(self, category):
        my_document = [x for x in self.cir_db if x['category'].lower() == category.lower()]
        if my_document == []:
            None
        return my_document

    def get_by_type(self, type):
        my_document = [x for x in self.cir_db if x['type'].lower() == type.lower()]
        if my_document == []:
            None
        return my_document

    def create(self, data):
        # For now, we'll set the id to be the same as the barcode_id. For production systems, we would
        # probably want these seperate, and to implement indexed searching by barcode_id for GET.
        try:
            data['_id'] = data['barcode_id']
            my_document = self.cir_db.create_document(data)
            my_document['id'] = my_document['barcode_id']
        except KeyError:
            api.abort(404, "Product {} already registered".format(id))
        return my_document

    def update(self, id, data):
        # Not currently supported
        return

    def delete(self, id):
        try:
            my_document = self.cir_db[id]
            my_document.delete()
        except KeyError:
            api.abort(404, "Product {} not registered".format(id))
        return

# Handlers for the actual API urls

# In a more production orientated version, you might well split these endpoints into
# those for a consumer (which is really just "look up by barcode"), and those that
# allow manufacturers to publish their product data.

@product_ns.route('')
class Product(Resource):
    @api.marshal_with(product)
    @api.doc('List products')
    @api.doc(params={'barcode_id': 'The barcode ID of this product (optional)'})
    @api.doc(params={'brand': 'The brand of this product (optional)'})
    @api.doc(params={'model': 'The model of this product (optional)'})
    @api.doc(params={'category': 'The category of this product (optional)'})
    @api.doc(params={'type': 'The type of this product (optional)'})
    def get(self):
        # Currently we support either a full list, or query by barcode_id/brand/model
        parser = reqparse.RequestParser()
        parser.add_argument('barcode_id', required=False, location='args')
        parser.add_argument('brand', required=False, location='args')
        parser.add_argument('model', required=False, location='args')
        parser.add_argument('category', required=False, location='args')
        parser.add_argument('type', required=False, location='args')
        args = parser.parse_args()
        filters_count = sum(value is not None for value in args.values())
        if filters_count == 0:
            return ProductDAO().list()
        else:
            return ProductDAO().get_by_filters(args)

    @api.marshal_with(product, code=201)
    @api.doc(body=product)
    def post(self):
        return ProductDAO().create(api.payload), 201

@product_ns.route('/<string:id>')
class ProductWithID(Resource):
    @api.marshal_with(product)
    @api.doc(params={'id': 'The unique ID of this product'})
    def get(self, id):
        return ProductDAO().get(id)

    @api.marshal_with(product)
    @api.doc(params={'id': 'The unique ID of this product'})
    def delete(self, id):
        return ProductDAO().delete(id)

if __name__ == '__main__':
	app.run()
