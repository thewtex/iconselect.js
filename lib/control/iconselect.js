
/**
 *
 * Created with NetBeans IDE
 *
 * Code     : Icon Select JS
 * Version  : 1.0
 *
 * User     : Bugra OZDEN
 * Site     : http://www.bugraozden.com
 * Mail     : bugra.ozden@gmail.com
 *
 * Date     : 10/30/13
 * Time     : 01:10 PM
 *
 */

import './iconselect.css';

IconSelect.DEFAULT = {};
IconSelect.DEFAULT.SELECTED_ICON_WIDTH = 48;
IconSelect.DEFAULT.SELECTED_ICON_HEIGHT = 48;
IconSelect.DEFAULT.SELECTED_BOX_PADDING = 1;
IconSelect.DEFAULT.SELECTED_BOX_PADDING_RIGHT = 12;
IconSelect.DEFAULT.ICONS_WIDTH = 32;
IconSelect.DEFAULT.ICONS_HEIGHT = 32;
IconSelect.DEFAULT.BOX_ICON_SPACE = 1;
IconSelect.DEFAULT.HORIZONTAL_ICON_NUMBER = 3;
IconSelect.DEFAULT.VECTORAL_ICON_NUMBER = 3;

IconSelect.COMPONENT_ICON_FILE_PATH = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAQAAACb+P2wAAAABGdBTUEAALGPC/xhBQAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4woCEhUXF3kHawAAAEZJREFUCNc9xrERQEAQAMB1IzajHS28XhSgAoFuCEU0oQctcCI2WjAkt2DK05S32PLQOOzpk+K/eslZeKyir4pW0VVgTC4vEbMU+2VifuUAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTEvMjgvMTNLZvc+AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEwLTAyVDE4OjIxOjIzLTA0OjAwbIGKZAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMC0wMlQxODoyMToyMy0wNDowMB3cMtgAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAAAElFTkSuQmCC";

export function IconSelect($$elementID, $$element, $$parameters) {
    
    var _icons = [];
    var _selectedIndex = -1;
    
    var _default = IconSelect.DEFAULT;

    function _init() {
        
        //parametreler boş gelirse
        if(!$$parameters) $$parameters = {};
        //En üst elementi seç
        if(_View.setIconSelectElement($$element)){
            
            //set parameters
            $$parameters = _Model.checkParameters($$parameters);
            //create UI
            var ui = _View.createUI($$parameters, $$elementID);
            //basıldığında göster/gizle
            _View.iconSelectElement.onclick = function(){
                _View.showBox();
            };
            
            //Başlangıçta gizle
            _View.showBox(false);

            //Nesneye basıldığında gizlemeyi iptal et.
            _View.iconSelectElement.addEventListener('click', function($event){
                $event.stopPropagation();             
            });
            
            //dışarı basıldığında gizle.
            window.addEventListener('click', function(){
                _View.showBox(false);
            });
           
        }else{
            alert("Element not found.");
        }
        
    }
    
    //Tüm iconları yeniden yükle.
    this.refresh = function($icons){
        
        _icons = [];
        
		_View.clearIcons();
		
        var setSelectedIndex = this.setSelectedIndex;
        
        for(var i = 0; i < $icons.length; i++){
            $icons[i].element = _View.createIcon($icons[i].iconFilePath, $icons[i].iconValue, i, $$parameters);
            $icons[i].element.onclick = function(){setSelectedIndex(this.childNodes[0].getAttribute('icon-index'));};
            _icons.push($icons[i]);
            
        }
        
        var horizontalIconNumber = Math.ceil(($icons.length) / $$parameters.vectoralIconNumber);
        
        _View.boxElement.style.height = (($$parameters.iconsHeight + 2) * horizontalIconNumber) + ((horizontalIconNumber + 1) * $$parameters.boxIconSpace) + 'px';
        this.setSelectedIndex(0);
        
    };
    
    //icon listesini al.
    this.getIcons = function(){ return _icons; };
    
    //iconu seçili hale gelir.
    this.setSelectedIndex = function($index){
        
        var icon;
        
        if(_icons.length > $index)
            icon = _icons[$index];
        
        if(icon){
            //eski icondan seçilme özelliğini kaldır.
            if(_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class','icon');
            _selectedIndex = $index;
            _View.selectedIconImgElement.setAttribute('src', icon.iconFilePath);
            if(_selectedIndex != -1) _icons[_selectedIndex].element.setAttribute('class','icon selected');
        }
        
        //_View.iconSelectElement.dispatchEvent(new Event('changed'));
		_View.iconSelectElement.dispatchEvent(new CustomEvent('changed'));
        
        //_View.showBox(false);
        
    };
    
    this.setSelectedValue = function(value) {
        var icon = _icons.filter(e => e.iconValue == value)
        var index = icon.length > 0 ? _icons.indexOf(icon[0]) : -1;

        return this.setSelectedIndex(index);
    }
    
    this.getSelectedIndex = function(){ return _selectedIndex; };
    this.getSelectedValue = function(){ return _icons[_selectedIndex].iconValue };
    this.getSelectedFilePath = function(){ return _icons[_selectedIndex].iconFilePath };
    
    
    
    //### VIEW CLASS ###
        
    function _View(){}
    
    _View.iconSelectElement;
    _View.boxElement;
    _View.boxScrollElement;
    _View.selectedIconImgElement;
    _View.selectedIconElement;
    
    _View.showBox = function($isShown){
                
         if($isShown == null) {
             $isShown = (_View.boxElement.style.display == "none") ? true : false;
         }
                
        if($isShown) {
            _View.boxElement.style.display = "block";
            _View.boxScrollElement.style.display = "block";
        }else{
            _View.boxElement.style.display = "none";
            _View.boxScrollElement.style.display = "none";
        }
        
        _View.boxElement.style.display = ($isShown) ? "block" : "none";
        
        
            
    };
    
    _View.setIconSelectElement = function($element){
        _View.iconSelectElement = $element;
        return _View.iconSelectElement;
    };
    
    _View.clearUI = function(){
        _View.iconSelectElement.innerHTML = "";
    };
    
    _View.clearIcons = function(){
        _View.boxElement.innerHTML = "";
    };
    
    _View.createUI = function($parameters){
        
        /* HTML MODEL
        
        <div id="my-icon-select" class="icon-select">
            <div class="selected-box">
                <div class="selected-icon"><img src="images/icons/i2.png"></div>
                <div class="component-icon"><img src="images/control/icon-select/arrow.png"></div>
                <div class="box">
                    <div class="icon"><img src="images/icons/i1.png"></div>
                    <div class="icon selected"><img src="images/icons/i2.png"></div>
                    <div class="icon"><img src="images/icons/i3.png"></div>
                    <div class="icon"><img src="images/icons/i4.png"></div>
                    <div class="icon"><img src="images/icons/i3.png"></div>
                    <div class="icon"><img src="images/icons/i4.png"></div>
                    <div class="icon"><img src="images/icons/i5.png"></div>
                    <div class="icon"><img src="images/icons/i6.png"></div>
                    <div class="icon"><img src="images/icons/i7.png"></div>
                    <div class="icon"><img src="images/icons/i8.png"></div>
                </div>
            </div>
        </div>
        
        */
        
        _View.clearUI();
        
        _View.iconSelectElement.setAttribute('class', 'icon-select');
        
        var selectedBoxElement = document.createElement('div');
        selectedBoxElement.setAttribute('class' ,'selected-box');
        
        var selectedIconElement = document.createElement('div');
        selectedIconElement.setAttribute('class' ,'selected-icon');
        
        _View.selectedIconImgElement = document.createElement('img');
        _View.selectedIconImgElement.setAttribute('src', '');
        selectedIconElement.appendChild(_View.selectedIconImgElement);
        
        var componentIconElement = document.createElement('div');
        componentIconElement.setAttribute('class', 'component-icon');
        
        var componentIconImgElement = document.createElement('img');
        componentIconImgElement.setAttribute('src', IconSelect.COMPONENT_ICON_FILE_PATH );
        componentIconElement.appendChild(componentIconImgElement);
        
        _View.boxScrollElement = document.createElement('div');
        _View.boxScrollElement.setAttribute('id',$$elementID + "-box-scroll");
        _View.boxScrollElement.setAttribute('class', 'box');
        
        _View.boxElement = document.createElement('div');
        
        //_View.boxElement.setAttribute('class', 'box');
        _View.boxScrollElement.appendChild(_View.boxElement);
        
        _View.selectedIconImgElement.setAttribute('width', $parameters.selectedIconWidth);
        _View.selectedIconImgElement.setAttribute('height', $parameters.selectedIconHeight);
        selectedBoxElement.style.width = $parameters.selectedIconWidth + $parameters.selectedBoxPadding + $parameters.selectedBoxPaddingRight + 'px';
        selectedBoxElement.style.height = $parameters.selectedIconHeight + ($parameters.selectedBoxPadding * 2) + 'px';
        selectedIconElement.style.width = $parameters.selectedIconWidth + 'px';
        selectedIconElement.style.height = $parameters.selectedIconHeight + 'px';
        selectedIconElement.style.top = '0px';
        selectedIconElement.style.left = '0px';
        componentIconElement.style.bottom = 4 + $parameters.selectedBoxPadding + 'px';
        
        _View.boxScrollElement.style.left = parseInt(selectedBoxElement.style.width) + 1 + 'px';
        
        _View.boxScrollElement.style.width = (($parameters.iconsWidth + 6) * $parameters.vectoralIconNumber) + (($parameters.vectoralIconNumber + 1) * $parameters.boxIconSpace) + 'px';
        _View.boxScrollElement.style.height = (($parameters.iconsHeight + 2) * $parameters.horizontalIconNumber) + (($parameters.horizontalIconNumber + 1) * $parameters.boxIconSpace) + 'px';
         
        _View.boxElement.style.left = _View.boxScrollElement.style.left + 'px';
        _View.boxElement.style.width = _View.boxScrollElement.style.width + 'px';
        
        _View.iconSelectElement.appendChild(selectedBoxElement);
        selectedBoxElement.appendChild(selectedIconElement);
        selectedBoxElement.appendChild(componentIconElement);
        selectedBoxElement.appendChild(_View.boxScrollElement);
        
        
        var results = {};
        results['iconSelectElement'] = _View.iconSelectElement;
        results['selectedBoxElement'] = selectedBoxElement;
        results['selectedIconElement'] = selectedIconElement;
        results['selectedIconImgElement'] = _View.selectedIconImgElement;
        results['componentIconElement'] = componentIconElement;
        results['componentIconImgElement'] = componentIconImgElement;
        
        return results;
        
        
       //trigger: created ( run setValues )
        
    };
        
    _View.createIcon = function($iconFilePath, $iconValue, $index, $parameters){
        
        /* HTML MODEL 
         
         <div class="icon"><img src="images/icons/i1.png"></div>
         
         */
        
        var iconElement = document.createElement('div');
        iconElement.setAttribute('class', 'icon');
        iconElement.style.width = $parameters.iconsWidth + 'px';
        iconElement.style.height = $parameters.iconsHeight + 'px';
        iconElement.style.marginLeft = $parameters.boxIconSpace + 'px';
        iconElement.style.marginTop = $parameters.boxIconSpace + 'px';
        
        var iconImgElement = document.createElement('img');
        iconImgElement.setAttribute('src', $iconFilePath);
        iconImgElement.setAttribute('alt', $iconValue);
        iconImgElement.setAttribute('title', $iconValue);
        iconImgElement.setAttribute('icon-value', $iconValue);
        iconImgElement.setAttribute('icon-index', $index);
        iconImgElement.setAttribute('width', $parameters.iconsWidth);
        iconImgElement.setAttribute('height', $parameters.iconsHeight);
        iconImgElement.style.width = $parameters.iconsWidth + 'px'
        iconImgElement.style.height = $parameters.iconsHeight + 'px'
        
        iconElement.appendChild(iconImgElement);
        _View.boxElement.appendChild(iconElement);
        
        return iconElement;
        
    };
    
    //### MODEL CLASS ###
    
    function _Model(){}
    
    //TODO: params değişkenini kaldır yeni oluştursun.
    _Model.checkParameters = function($parameters){
        
        $parameters.selectedIconWidth          = ($parameters.selectedIconWidth)          ? $parameters.selectedIconWidth        : _default.SELECTED_ICON_WIDTH;
        $parameters.selectedIconHeight         = ($parameters.selectedIconHeight)         ? $parameters.selectedIconHeight       : _default.SELECTED_ICON_HEIGHT;
        $parameters.selectedBoxPadding         = ($parameters.selectedBoxPadding)         ? $parameters.selectedBoxPadding       : _default.SELECTED_BOX_PADDING;
        $parameters.selectedBoxPaddingRight    = ($parameters.selectedBoxPaddingRight)    ? $parameters.selectedBoxPaddingRight  : _default.SELECTED_BOX_PADDING_RIGHT;
        $parameters.iconsWidth                 = ($parameters.iconsWidth)                 ? $parameters.iconsWidth               : _default.ICONS_WIDTH;
        $parameters.iconsHeight                = ($parameters.iconsHeight)                ? $parameters.iconsHeight              : _default.ICONS_HEIGHT;
        $parameters.boxIconSpace               = ($parameters.boxIconSpace)               ? $parameters.boxIconSpace             : _default.BOX_ICON_SPACE;
        $parameters.vectoralIconNumber         = ($parameters.vectoralIconNumber)         ? $parameters.vectoralIconNumber       : _default.VECTORAL_ICON_NUMBER;
        $parameters.horizontalIconNumber       = ($parameters.horizontalIconNumber)       ? $parameters.horizontalIconNumber     : _default.HORIZONTAL_ICON_NUMBER;
    
        return $parameters;
    
    };
    
    _init();
    
}

(function () {
    if (typeof window.CustomEvent === "function") return false; //If not IE

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
