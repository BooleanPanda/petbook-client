import React from 'react';

interface Props {
    message: {
        text: string,
        sender: string,
        dialog: string
    }
};

const Message = (props: Props) => {
    return (
        <div className="messages__chat_output_item">
            <p className="text text-normal text-scndark">{props.message.text}</p>
        </div>
    );
};

export default Message;