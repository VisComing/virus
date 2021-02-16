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
    jinbiCnt : number = 0
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    setJinbiLabel () { //根据jinbiCnt来设置
        if(this.jinbiCnt >= 1000) {
            this.label.string = String((this.jinbiCnt / 1000).toFixed(2)) + 'k'
        }
        else {
            this.label.string = String(this.jinbiCnt)
        }
    }
    // update (dt) {}
}
