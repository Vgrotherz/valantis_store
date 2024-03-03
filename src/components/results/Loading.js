import React from "react";

const Loading = () => {
    return (
        <div className="loading margin_1rem">
            {/* loading screen */}
            <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading;