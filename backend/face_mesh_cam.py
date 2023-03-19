import cv2
import mediapipe as mp

# import the drawing utilities and face mesh components from MediaPipe
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_face_mesh = mp.solutions.face_mesh

# define the VideoCamera object
class VideoCamera(object):
    def __init__(self):
      # initialize the camera capture and the face mesh model
      self.video = cv2.VideoCapture(0)
      self.face_mesh = mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5)

    def __del__(self):
      # release the camera and close the fash mesh model
      self.video.release()
      self.face_mesh.close()

    def get_frame(self):
      # capture a frame from the camera
      success, image = self.video.read()
      if not success:
        print("Ignoring empty camera frame.")
        return None

      # convert the image to RGB format for MediaPipe processing
      image.flags.writeable = False
      image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
      results = self.face_mesh.process(image)

      # process the image using the face mesh model
      image.flags.writeable = True
      image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

      # draw face mesh landmarks on the image if any are detected
      if results.multi_face_landmarks:
          for face_landmarks in results.multi_face_landmarks:
              # draw the face mesh tessellation
              mp_drawing.draw_landmarks(
                  image=image,
                  landmark_list=face_landmarks,
                  connections=mp_face_mesh.FACEMESH_TESSELATION,
                  landmark_drawing_spec=mp_drawing.DrawingSpec(thickness=1, circle_radius=1),
                  connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_tesselation_style())
              # draw the face mesh contours
              mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_CONTOURS,
                    landmark_drawing_spec=mp_drawing.DrawingSpec(thickness=1, circle_radius=1),
                    connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_contours_style())
              #draw the face mesh irises
              mp_drawing.draw_landmarks(
                    image=image,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_IRISES,
                    landmark_drawing_spec=mp_drawing.DrawingSpec(thickness=1, circle_radius=1),
                    connection_drawing_spec=mp_drawing_styles.get_default_face_mesh_iris_connections_style())

      # flip the image horizontally for a selfie-view display
      flipped_image = cv2.flip(image, 1)

      # encode the image to JPEG format
      ret, jpeg = cv2.imencode('.jpg', flipped_image)
      
      # return the encoded image as bytes
      return jpeg.tobytes()