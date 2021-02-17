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

    @property([cc.Prefab])
    bulletPrefab = []

    // LIFE-CYCLE CALLBACKS:

    d0_1Pool : cc.NodePool = null
    onLoad () {
        this.d0_1Pool = new cc.NodePool()
        for (let i = 0; i < 28; ++i) {
            let bullet = cc.instantiate(this.bulletPrefab[0]); // 创建节点
            this.d0_1Pool.put(bullet); // 通过 put 接口放入对象池
        }
    }
    
    start () {

    }

    onFire (resPos : cc.Vec2, bulletNumber : number) {
        resPos = this.node.convertToNodeSpaceAR(resPos)
        let startPosX = resPos.x - (bulletNumber / 2) * 50
        for(let i = 0; i < bulletNumber; i++) {
            let d0_1Node : cc.Node = null
            if (this.d0_1Pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                d0_1Node = this.d0_1Pool.get()
            } 
            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                d0_1Node = cc.instantiate(this.bulletPrefab[0])
            }
            d0_1Node.parent = this.node
            //这里的坐标我调整了一下， + 30  - 50
            d0_1Node.setPosition(startPosX + i * 50 + 30, resPos.y - 50)
            d0_1Node.runAction(cc.sequence(cc.moveTo(0.3, cc.v2(d0_1Node.x, 1000)), cc.callFunc(function(target, node) {
                this.d0_1Pool.put(node)
            }, this, d0_1Node)))
        }

    }

    // update (dt) {}
}
