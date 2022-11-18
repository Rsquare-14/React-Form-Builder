import React, { useState, useEffect } from "react";
import { ReactFormGenerator, ElementStore } from "react-form-builder2";
import "./preview.css";

const initialPreviewState = {
    data: [],
    previewVisible: false
}

export const PreviewBar = (props) => {

    const [previewState, setPreviewState] = useState(initialPreviewState);

    const update = (jsonData) => {
        setPreviewState({ data: jsonData })
    }

    useEffect(() => {
        ElementStore.subscribe((state) => {
            update(state.data)
        })
    }, [])


    const showPreview = () => {
        setPreviewState({
            data: previewState.data,
            previewVisible: true
        })
    }

    const saveJson = (data) => {
        console.log("inside save", data);
    }

    const closePreview = () => {
        setPreviewState({
            data: previewState.data,
            previewVisible: false
        })
    }

    return (
        <div className="preview-bar">
            <span className="form-title">DataBeat Form Builder</span>
            <button className="btn btn-primary float-right" onClick={showPreview}>Preview Form</button>
            {
                previewState.previewVisible &&
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <ReactFormGenerator
                                download_path="./saved"
                                action_name="Save"
                                form_action="/"
                                form_method="POST"
                                onSubmit={saveJson}
                                data={previewState.data} />

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}