import React, {useState , useContext} from 'react';
import { SketchPicker, CirclePicker } from 'react-color';
import reactCSS from 'reactcss';
import './configuration.scss';
import ConfigContext from './../context/config-context'

const Configuration = (props) => {

    let configContext = useContext(ConfigContext);
    let [displayColorPicker, setDisplayColorPicker] = useState(false);
    let [headerColor, setHeaderColor] = useState(configContext.background);
    let [textColor, setTextColor] = useState(configContext.color);
    let [seletecItem, setSelectedItem] = useState(null);


    const styles = reactCSS({
        'default': {
            backgroundColor: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: headerColor,
            },
            textColor : {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: textColor,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px #5101d1',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });


    const handleClick = (context) => {
        setSelectedItem(context);
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (context, color) => {
        console.log(color + "  " + context);
        switch (context) {
            case "background" :
                setHeaderColor(color.hex);
                break;
            case "text" :
                setTextColor(color.hex);
                break;
        }

    };

    const applyColorChanges = () => {
        configContext.applyColors(headerColor, textColor);
    }


    return (
        <div className="config">
            <div className="config_background">
                <h1>Background</h1>
                <div style={ styles.swatch } onClick={ handleClick.bind(this, "background") }>
                    <div style={ styles.backgroundColor } />
                </div>
            </div>
            <div className="config_text">
                <h1>Text</h1>
                <div style={ styles.swatch } onClick={ handleClick.bind(this, "text") }>
                    <div style={ styles.textColor } />
                </div>
            </div>
            <div>
                <button onClick={applyColorChanges}>Set</button>
            </div>
            { displayColorPicker ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ handleClose }/>
                <SketchPicker color={ headerColor } onChange={ handleChange.bind(this,seletecItem) } />
            </div> : null }
            {/*<div className="config_text">
                <h1>Text</h1>
                <div style={ styles.swatch } onClick={ handleClick }>
                    <div style={ styles.color } />
                </div>
                { displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ handleClose }/>
                    <SketchPicker color={ headerColor } onChange={ handleChange } />
                </div> : null }
            </div>
*/}

        </div>
    )
};

export  default  Configuration;
