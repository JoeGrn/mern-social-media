import { Popup } from 'semantic-ui-react';
import React from 'react';
interface Props {
    content: string
    children: JSX.Element
}

function MyPopup({ content, children }: Props) {
    return <Popup inverted content={content} trigger={children} />;
}

export default MyPopup;