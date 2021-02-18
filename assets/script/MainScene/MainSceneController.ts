// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node) 
    topBar : cc.Node = null

    @property(cc.Node) 
    logo : cc.Node = null

    // @property(cc.Node) 
    // TwoCircleMove : cc.Node = null

    @property(cc.Node) 
    lingqujinbi : cc.Node = null

    @property(cc.Node) 
    guanqia : cc.Node = null

    @property(cc.Node) 
    shejibingdu : cc.Node = null

    @property(cc.Node) 
    bottom : cc.Node = null

    @property(cc.Node) 
    virusProgressBar = null

    scriptArray = Array()
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scriptArray.push(this.topBar.getComponent('topBar'))
        this.scriptArray.push(this.logo.getComponent('logo'))
        //this.scriptArray.push(this.TwoCircleMove.getComponent('lvquanmove'))
        this.scriptArray.push(this.lingqujinbi.getComponent('lingqujinbi'))
        this.scriptArray.push(this.guanqia.getComponent('guanqia'))
        this.scriptArray.push(this.shejibingdu.getComponent('tip'))
        this.scriptArray.push(this.bottom.getComponent('bottom'))
        this.scriptArray.push(this.virusProgressBar.getComponent('virusProgressBar'))
    }

    start () {

    }

    moveIn () {
        for(let i = 0; i < this.scriptArray.length; i++) {
            this.scriptArray[i].moveIn()
        }
    }

    moveOut () {
        for(let i = 0; i < this.scriptArray.length; i++) {
            this.scriptArray[i].moveOut()
        }
    }
    // update (dt) {}
}
