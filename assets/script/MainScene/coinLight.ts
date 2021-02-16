// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    text: string = 'hello';

    @property(cc.Label)
    coinNumber : cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    progressBar : cc.ProgressBar = null

    start () {
        this.progressBar = this.node.getComponent(cc.ProgressBar)
        if(!this.progressBar) {
            cc.error('coinLight.ts, could not get component')
        }
    }

    update (dt) {
        this.progressBar.progress += 0.005
        if(this.progressBar.progress >= 1) {
            //增加金币数，注意字符串与数字间的转换
            this.progressBar.progress = 0
            let lingqujinbi = this.node.parent.parent.getComponent('lingqujinbi')
            if(!lingqujinbi) {
                cc.error('coinLight.ts, null component')
            }
            lingqujinbi.coinCnt += 120
            let number : number = lingqujinbi.coinCnt
            if(number >= 1000) {
                this.coinNumber.string = String((number / 1000).toFixed(2)) + 'k'
            }
            else {
                this.coinNumber.string = String(number)
            }

            
            // if(str.charAt(str.length - 1) === 'k') {
            //     number = Number(str.slice(0, -1))
            //     number *= 1000
            // }
            // else {
            //     number = Number(str)
            // }
            // number += 120
            // cc.log(number)
            // if(number < 1000) {
            //     this.coinNumber.string = String(number)
            // }
            // else {
            //     number = number / 1000
            //     this.coinNumber.string = String(number.toFixed(2)) + 'k'
            // }
        }
    }
}
