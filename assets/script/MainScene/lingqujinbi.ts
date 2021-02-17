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

    @property(cc.Prefab)
    jinbiPrefab : cc.Prefab = null
    // LIFE-CYCLE CALLBACKS:
    jinbiPool : cc.NodePool = null

    onLoad () {
        this.jinbiPool = new cc.NodePool();
        for (let i = 0; i < 18; ++i) {
            let jinbi = cc.instantiate(this.jinbiPrefab); // 创建节点
            this.jinbiPool.put(jinbi); // 通过 put 接口放入对象池
        }
    }

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

    onTouch (event : cc.Event.EventTouch) {
        event.stopPropagation()
        if(this.coinCnt > 0) {
            let jinbi = cc.find('Canvas/TopBar/jinbi')
            let jinbiComp = jinbi.getComponent('jinbi')
            jinbiComp.jinbiCnt += this.coinCnt
            jinbiComp.setJinbiLabel()
            this.coinCnt = 0
            this.label.string = '0'
            let jinbiAnimation = this.node.getParent().getComponent('jinbiAnimation')
            jinbiAnimation.createJinbiAnimation(250, this.node.getPosition(), 18, cc.v2(-477.763, 905.908))
            // this.getPoint(250, 0, 0, 18)
            // let jinbiArray : cc.Node[] = Array<cc.Node> ()
            // for(let i = 0; i < this.point.length; i++) {
            //     let pos : cc.Vec2 = cc.v2(this.point[i])
            //     let jinbiNode : cc.Node = null
            //     if (this.jinbiPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            //         jinbiNode = this.jinbiPool.get();
            //     } 
            //     else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            //         jinbiNode = cc.instantiate(this.jinbiPrefab);
            //     }
            //     jinbiArray.push(jinbiNode)
            //     jinbiNode.setPosition(pos)
            //     this.node.addChild(jinbiNode)

            // }
            // //runAction
            // let speed : number = 500
            // for(let i : number = 0; i < jinbiArray.length; i++) {
            //     let time : number = Math.sqrt((jinbiArray[i].x + 917) * (jinbiArray[i].x + 917) +
            //                                     (jinbiArray[i].y - 897) * (jinbiArray[i].y - 897)) / speed
                
            //     jinbiArray[i].runAction(cc.sequence(cc.moveTo(time, cc.v2(-917, 897)), 
            //     cc.callFunc(function(target, nodep) {
            //         this.jinbiPool.put(nodep)
            //     }, this, jinbiArray[i]), 
            //     cc.callFunc(function(target) {
            //         let jinbiTop : cc.Node = cc.find('Canvas/TopBar/jinbi/jinbi')
            //         if(!jinbiTop) {
            //             cc.error('lingqujinbi.ts, null node')
            //         }
            //         else {
            //             jinbiTop.runAction(cc.sequence(cc.scaleTo(0.03, 1.5), cc.scaleTo(0, 1)))
            //         }
            //     }, this)))
            // }
        }
    }


    jinbiAnimation () {
    
    }

    point = []; //结果
/*
* 求圆周上等分点的坐标
* ox,oy为圆心坐标
* r为半径
* count为等分个数
*/
    getPoint(r: number, ox: number, oy: number, count: number){
        let radians : number = (Math.PI / 180) * Math.round(360 / count) //弧度
        
        for(let i = 0; i < count; i++){
            let x : number = ox + r * Math.sin(radians * i);
            let y : number = oy + r * Math.cos(radians * i);

            this.point.unshift({x:x,y:y}); //为保持数据顺时针
        }
    }
    // update (dt) {}
}
