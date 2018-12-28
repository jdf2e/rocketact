import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";

import Loading from "./Loading";
import store, { IGlobalLoadingStore } from "../stores/globalLoading";

interface IGloalLoadingModalProps {
  store: IGlobalLoadingStore;
}

@observer
class GloalLoadingModal extends React.Component<IGloalLoadingModalProps, {}> {
  el: HTMLDivElement;

  constructor(props: IGloalLoadingModalProps) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const text = this.props.store.text;

    return text
      ? ReactDOM.createPortal(
          <div
            className="ant-modal-mask"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              zIndex: 1010,
              textAlign: "center",
              paddingTop: 300
            }}
          >
            <Loading />
            <p>{text}</p>
          </div>,
          this.el
        )
      : null;
  }
}

export default () => <GloalLoadingModal store={store} />;
