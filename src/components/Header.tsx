import React from 'react'

const Header: React.FC<{ saveJsonToLocalStorage: any }> = ({ saveJsonToLocalStorage }) => {
    return (
        <div className="header font-semibold flex justify-center h-10 mt-2">
            <button className="px-4 py-1 border border-black-300 rounded" onClick={saveJsonToLocalStorage}>Save</button>
        </div>
    )
}

export default Header;