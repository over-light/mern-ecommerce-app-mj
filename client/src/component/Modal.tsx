import React from "react";

type ModalProps = {
    title?: string;
    children?: any;
    open: boolean;
    cancelText?: string;
    submitText?: string,
    onCancel?: () => void;
    isHeader?: boolean;
    isFooter?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        open = false,
        title = '',
        children = '',
        cancelText = '',
        submitText = '',
        isFooter = false,
        isHeader = false,
        onCancel = () => { }
    } = props;
    return (
        <>
            {
                open && <div className="modal fade show d-block customModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {isHeader &&
                                <div className="modal-header">
                                    {title && <h5 className="modal-title" id="exampleModalLabel">{title}</h5>}
                                    <button type="button" className="btn-close" onClick={onCancel}></button>
                                </div>
                            }
                            <div className="modal-body">
                                {children}
                            </div>
                            {isFooter &&
                                <div className="modal-footer">
                                    {cancelText && <button type="button" className="btn btn-secondary" onClick={onCancel}>{cancelText}</button>}
                                    {submitText && <button type="button" className="btn btn-primary">{submitText}</button>}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
