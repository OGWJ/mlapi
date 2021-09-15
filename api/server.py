# import the necessary packages
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications import imagenet_utils
from PIL import Image
import numpy as np
from flask import Flask, request
import io

# initialize our Flask application and the Keras model
app = Flask(__name__)
model = None


def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global model
    model = ResNet50(weights="imagenet")


def prepare_image(image, target):
    # if the image mode is not RGB, convert it
    if image.mode != "RGB":
        image = image.convert("RGB")

    # resize the input image and preprocess it
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = imagenet_utils.preprocess_input(image)

    # return the processed image
    return image


@app.route("/predict", methods=["POST"])
def predict():
    # ensure an image was properly uploaded to our endpoint
    if request.method == "POST":

        img = request.files.get('image')

        if not img:
            return 404
        
        # img = str.encode(img).read()
        img = img.read()
        img = Image.open(io.BytesIO(img))

        # preprocess the image and prepare it for classification
        img = prepare_image(img, target=(224, 224))

        # classify the input image and then initialize the list
        # of predictions to return to the client
        preds = model.predict(img)
        results = imagenet_utils.decode_predictions(preds)

        data = {} 
        data["predictions"] = []

        # loop over the results and add them to the list of
        # returned predictions
        for (imagenetID, label, prob) in results[0]:
            r = {"label": label, "probability": float(prob)}
            data["predictions"].append(r)

            # indicate that the request was a success
            # data["success"] = True

        print(data)

    # return the data dictionary as a JSON response
    return data


# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    load_model()
    app.run(debug=True, port=5000)
