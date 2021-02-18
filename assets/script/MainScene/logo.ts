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
    qiangKou: cc.Node = null

    @property(cc.Node) 
    faSheTiao: cc.Node = null

    @property(cc.Node)
    lvquan: cc.Node = null

    @property(cc.Node)
    feiXing1: cc.Node = null

    @property(cc.Node)
    feiXing2: cc.Node = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    moveIn () {
        this.lvquan.active = false
        let seq : cc.ActionInterval = cc.sequence(cc.moveTo(0.2, cc.v2(this.node.x, -80))
                                                        .easing(cc.easeQuarticActionInOut()),
                                                cc.moveTo(0.15, cc.v2(this.node.x, 0))
                                                        .easing(cc.easeQuarticActionInOut()))
        this.node.stopAllActions()  
        this.node.runAction(cc.sequence(seq, cc.callFunc(this.qiangKouAction, this), 
                                cc.callFunc(this.faSheTiaoAction, this)))

        
    }

    moveOut () {
        let seq : cc.ActionInterval = cc.sequence(cc.moveTo(0.2, cc.v2(this.node.x, -80))
                                                            .easing(cc.easeQuarticActionInOut()),
                                                cc.moveTo(0.15, cc.v2(this.node.x, 700))
                                                            .easing(cc.easeQuarticActionInOut()))
        this.node.stopAllActions()  
        this.lvquan.getComponent('lvquanmove').moveOut()
        this.node.runAction(seq)
    }

    qiangKouAction () {
        this.qiangKou.stopAllActions()
        this.qiangKou.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.2), cc.fadeIn(0.2))))
    }

    faSheTiaoAction () {
        this.faSheTiao.stopAllActions()
        this.faSheTiao.scaleX = 0
        this.faSheTiao.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(0.2), cc.fadeIn(0.2))))
        this.faSheTiao.runAction(cc.sequence(cc.scaleTo(0.7, 1, 1), 
                                cc.callFunc(this.feiXingAction, this)))
    }

    feiXingAction () {
        this.feiXing1.active = true
        this.feiXing2.active = true
        this.feiXing1.stopAllActions()
        this.feiXing2.stopAllActions()
        this.feiXing1.scale = 0.2
        this.feiXing2.scale = 0.2
        this.feiXing1.setPosition(cc.v2(271.254, 637.947))
        this.feiXing2.setPosition(cc.v2(284.955, 588.098))

        this.feiXing1.runAction(cc.sequence(cc.spawn(cc.moveTo(0.3, cc.v2(340, 700)), cc.scaleTo(0.3, 1, 1)), 
                                            cc.callFunc(function(target) {
                                                this.lvquan.getComponent('lvquanmove').moveIn()
                                                this.feiXing1.active = false
                                                this.feiXing2.active = false
                                            }, this)))
        this.feiXing2.runAction(cc.spawn(cc.moveTo(0.3, cc.v2(342, 550)), cc.scaleTo(0.3, 1, 1)))
    }
    // update (dt) {}
}
