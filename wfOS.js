// 手机端弹窗
var mobileFlag = false;
window.onload=()=>{
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
    for (var v = 0; v < mobileAgents.length; v++) {
       if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
             mobileFlag = true;
             break;
       }
    }
    if(mobileFlag){
        alert("本站暂未适配手机端，部分显示可能较奇怪，建议使用大屏设备打开，如电脑、平板电脑等。")
    }
        reloadListeners()
}

// 定义
let dock=document.getElementById("dock")
let dockActivator=document.getElementById("dockActivator")
let dockApps = document.getElementById("dockApps")
// 新建窗口
var windowIDs=0
const windowHTML1='class="windowCLOSE"><svg viewBox="0 0 32 24"><line x1="10" x2="22" y1="6" y2="18" stroke-width="1" stroke="#111" stroke-linecap="round" /><line x1="22" x2="10" y1="6" y2="18" stroke-width="1" stroke="#111" stroke-linecap="round" /></svg></span><span onclick="javascript:windowmaxsize(\'window'
const windowHTML1_2='\')" class="windowMAXSIZE"><svg viewBox="0 0 32 24"><rect x="8" y="6" width="16" height="12" stroke-width="1" stroke="#111" fill="transparent" rx="4"> </svg></span><span onclick=\'javascript:minimaxsize("window'
const windowHTML2='class="windowMINIMIZE"><svg viewBox="0 0 32 24"><line x1="8" x2="24" y1="12" y2="12" stroke-width="1" stroke="#111" stroke-linecap="round" /></svg></span><span class="windowTOPS"><svg>'
const windowHTML2_1='<p class="windowTITLES">'
const windowHTML2_2='</p></span><span class="windowFILLINS">'
const windowHTML3='</span>'
const windowFillinHTML=[
    '',
    '<iframe src="aboutwfOS.html">',
    '',
    '<iframe src="music-unlocker/index.html">',
    'INTERNET EXPLORER', // the explorer
    '<iframe src="play.html">',
    '<iframe src="Downloads.html">',
    '<iframe src="超课表3.1.html">',
    '<iframe src="startpage.html">',
    '<iframe src="webOS.html">',
]
const windowTitles=[
    '',
    '关于',
    '未知',
    '音乐解锁',
    'wfOS浏览器', // the explorer
    '未知',
    '未知',
    '未知',
    '未知',
    '未知',
]
// 新窗口
function newWindow(wintype) {
    var newWindowReferHTML = document.createElement("span")
    newWindowReferHTML.innerHTML='<div class="dockAppIcons" onclick="minimaxsize(\''+"window"+windowIDs+'\')"><p>'+windowIDs+'</p></div>'
    newWindowReferHTML.id="windowRefer"+windowIDs
    dockApps.appendChild(newWindowReferHTML)
    var newWindowHTML = document.createElement("span")
    newWindowHTML.id="window"+windowIDs
    if(windowFillinHTML[wintype]=='INTERNET EXPLORER'){
        explorerFillinHTML="<span></span>"
        newWindowHTML.innerHTML="<span onclick='javascript:windowClose(\"window"+windowIDs+"\")' "+windowHTML1+windowIDs+windowHTML1_2+windowIDs+"\")'"+windowHTML2+windowHTML2_2+explorerFillinHTML+windowHTML3
    }else{
        newWindowHTML.innerHTML="<span onclick='javascript:windowClose(\"window"+windowIDs+"\")' "+windowHTML1+windowIDs+windowHTML1_2+windowIDs+"\")'"+windowHTML2+windowHTML2_1+windowTitles[wintype]+windowHTML2_2+windowFillinHTML[wintype]+windowHTML3
    }
    windowIDs++
    newWindowHTML.className="windows"
    document.body.appendChild(newWindowHTML)
    reloadListeners();
}
// 关闭
function windowClose(arg){
    element=document.getElementById(arg)
    element.style.transform="scaleY(.02)"
    element.style.transitionDuration=".2s"
    setTimeout(() => {
        element.style.transform="scale(.02)"
        element.style.transitionDuration=".2s"
        setTimeout(() => {
            element.remove()
        }, 200);
    }, 200);
    document.getElementById("windowRefer"+arg.substr(6,10)).remove()
    if(element.maxsized==true){
        dockShow()
    }
}
// 最小化
function minimaxsize(arg){
    element=document.getElementById(arg)
    if(element.style.transform=='translateY(100vh) scale(0)'){
        element.style.transitionDuration='0.5s'
        element.style.transform='translateY(0) scale(1)'
        if(element.maxsized){
            dockHide()
        }
        setTimeout(() => {
            element.style.transitionDuration='0s'
        }, 500);
    }
    else{
        element.style.transitionDuration='0.5s'
        element.style.transform='translateY(100vh) scale(0)'
        dockShow()
        setTimeout(() => {
            element.style.transitionDuration='0s'
        }, 500);
    }
}
// 最大化
var maxsizedWindowData=''
function windowmaxsize(arg){
    element=document.getElementById(arg)
    if(element.maxsized!=true){ // normal size
        element.style.transitionDuration='0.3s'
        maxsizedWindowData1=element.style.left
        maxsizedWindowData2=element.style.top
        maxsizedWindowData3=element.style.width
        maxsizedWindowData4=element.style.height
        element.style.left='0'
        element.style.top='0'
        element.style.width='100%'
        element.style.height='100%'
        element.style.borderRadius='0'
        element.maxsized=true
        dockHide()
        dockActivator.style.display="block"
        setTimeout(() => {
            element.style.transitionDuration='0s'
        }, 300);
    }
    else{ //maximized
        element.style.transitionDuration='0.3s'
        element.style.left=maxsizedWindowData1
        element.style.top=maxsizedWindowData2
        element.style.width=maxsizedWindowData3
        element.style.height=maxsizedWindowData4
        element.style.borderRadius='8px'
        element.maxsized=false
        setTimeout(() => {
            element.style.transitionDuration='0s'
        }, 300);
        dockShow()
    }
}

// 刷新监听器：窗口移动，浏览器Tab功能
const newTabHTML1='<p>'// 后加tabTitle
const newTabHTML2='</p><span class="explorerTabsCloser"><p>+</p></span>'
function reloadListeners(){
    let windowTOPS = document.getElementsByClassName("windowTOPS")
    for (let i = 0; i < windowTOPS.length; i++) {
        const element = windowTOPS[i];
        var windows = element.parentElement;
        element.onmousedown = function (ev) {
            if(windows.maxsized){
                windowmaxsize(windows.id)
            }
            windows.lastElementChild.style.pointerEvents='none'
            windows.style.transitionDuration='0'
            let e = ev || event
            let x = e.clientX - element.parentElement.offsetLeft
            let y = e.clientY - element.parentElement.offsetTop
            window.onmouseup = ()=>{
                window.onmousemove = null
                window.onmouseup = null
                windows.lastChild.style.pointerEvents='all'
            }
            desktopWidth=document.getElementById("desktop").offsetWidth
            desktopHeight=document.getElementById("desktop").offsetHeight
            window.onmousemove = function (ev) {
                if (ev.clientX<0||ev.clientY<0||ev.clientX>desktopWidth||ev.clientY>desktopHeight) {
                    return
                }
                element.parentElement.style.left = ev.clientX - x + 'px'
                element.parentElement.style.top = ev.clientY - y + 'px'
            }
        }
    }
    let explorerTabsCloser = document.getElementsByClassName("explorerTabsCloser")
    for (let i = 0; i < explorerTabsCloser.length; i++) {
        const element = explorerTabsCloser[i];
        element.onclick=()=>{
            tabNum = parseInt(element.parentElement.parentElement.parentElement.tabNum-1)
            if (tabNum==0) {
                element.parentElement.parentElement.parentElement.windowClose()
            }
            element.parentElement.parentElement.parentElement.tabNum = tabNum
            element.parentElement.remove() // animation later here
        }
    }
    let explorerAddTabers = document.getElementsByClassName("explorerAddTabers")
    for (let i = 0; i < explorerAddTabers.length; i++) {
        const element = explorerAddTabers[i];
        element.onclick=function(){
            let tabNum = parseInt(element.parentElement.parentElement.tabNum)
            let newTabHTML = document.createElement("span")
            newTabHTML.innerHTML=newTabHTML1+'test'+tabNum+newTabHTML2
            newTabHTML.className='explorerTabs'
            newTabHTML.id='tab'+tabNum
            element.parentElement.children[0].appendChild(newTabHTML)
            element.parentElement.tabNum = tabNum+1
            reloadListeners()
        }
    }
    let explorerSearchBarInputs = document.getElementsByClassName("explorerSearchBarInput")
    for (let i = 0; i < explorerSearchBarInputs.length; i++) {
        const element = explorerSearchBarInputs[i];
        element.onfocus=()=>{
            document.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==13){
                    // 需重写
                    element.parentElement.parentElement.parentElement.children[1].innerHTML='<iframe src="'+element.value+'"></iframe>'
                }
            }
        }
        element.onblur=()=>{
            document.onkeydown = null
        }
    }
}

// dock栏感应
dockActivator.onmousedown=()=>{
    dockShow()
    dock.acivateByMaxsize=false
}
dock.onmouseleave=()=>{
    if(dock.acivateByMaxsize==false) {
        dockHide()
    }
}
function dockShow(){
    dock.style.transform="translateY(0px)"
    dockActivator.style.transform="translateY(16px)"
    dock.acivateByMaxsize=true
}
function dockHide(){
    dock.style.transform="translateY(44px)"
    dockActivator.style.transform="translateY(0px)"
    dockActivator.style.display="true"
}