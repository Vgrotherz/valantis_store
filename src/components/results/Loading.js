import React from "react";

const Loading = () => {
    return (
        <div className="loading">
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