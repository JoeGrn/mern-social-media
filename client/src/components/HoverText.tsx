import { Popup } from 'semantic-ui-react';
import React from 'react';
interface Props {
    content: string
    children: JSX.Element
}

const MyPopup: React.FC<Props> = ({ content, children }) => {
    return <Popup inverted content={content} trigger={children} />;
}

export default MyPopup;