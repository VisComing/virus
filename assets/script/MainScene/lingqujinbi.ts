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

    @property
    coinCnt: number = 0
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on('touchstart', this.onTouch, this)
    }
    moveIn () {
        let action : cc.ActionInterval = cc.moveTo(0.3, cc.v2(443.398, this.node.y)).easing(cc.easeCubicActionOut())
        this.node.stopAllActions()  
        this.node.runAction(action)
    }

    moveOut () {
        let action : cc.ActionInterval = cc.moveTo(0.3, cc.v2(800, this.node.y)).easing(cc.easeCubicActionIn())
        this.node.stopAllActions()  
        this.node.runAction(action)
    }

    onTouch () {
        let jinbi = cc.find('Canvas/TopBar/jinbi')
        let jinbiComp = jinbi.getComponent('jinbi')
        jinbiComp.jinbiCnt += this.coinCnt
        jinbiComp.setJinbiLabel()
        this.coinCnt = 0
        this.label.string = '0'
    }
    // update (dt) {}
}
