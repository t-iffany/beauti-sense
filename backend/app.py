import flask import Flask, render_template, Response
from flask_cors import CORS
from face_mesh_cam import VideoCamera

# create a Flask app with CORS enabled
app = Flask(__name__)
CORS(app)

# define the root route that serves the index.html template
@app.route('/')
def index():
    return render_template('index.html')

# define a generator function that yields video frames from the VideoCamera object
def gen(camera):
    while True:
        frame = camera.get_frame()
        # if the frame is None, continue to the next iteration
        if frame is None:
            continue
          # yield the fram as a multipart HTTP response
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

# define a route for the video feed that returns a streaming response
@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# start the Flask app when the script is run directly
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)