import React from 'react';

const VideoFeed = () => {
  return (
    <div>
      <img
        src="http://localhost:5000/video_feed"
        alt="Video feed"
        style={{ width: '100vw', height: '70vh',objectFit:'cover' }}
      />
    </div>
  );
};

export default VideoFeed;