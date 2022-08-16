import React from "react";

import "./IntroduceRoom.css";

import StreamComponent from "../../stream/StreamComponent";
import IntroduceTimer from "../../Common/timer/IntroduceTimer";

function IntroduceRoom(props) {
  const localUser = props.localUser;
  const setMode = (num) => {
    props.setMode(num);
  };
  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser1">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers1" + i}
        >
          <StreamComponent
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
      <IntroduceTimer sec={20} setMode={setMode} />
    </>
  );
}

export default IntroduceRoom;