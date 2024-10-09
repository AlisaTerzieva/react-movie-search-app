/* Source used with local modifications: https://loading.io/css/ */

import "./Spinner.css";

const Spinner = () => {
    return <>
        <div className="lds-grid">
            <div className="lds-inner-grid">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    </>
}

export {Spinner};