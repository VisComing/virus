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

    @property(cc.Prefab)
    jinbiPrefab : cc.Prefab = null

    // LIFE-CYCLE CALLBACKS:
    jinbiPool : cc.NodePool = null
    onLoad () {
        this.jinbiPool = new cc.NodePool();
        for (let i = 0; i < 28; ++i) {
            let jinbi = cc.instantiate(this.jinbiPrefab); // 创建节点
            this.jinbiPool.put(jinbi); // 通过 put 接口放入对象池
        }
    }

    start () {

    }

    createJinbiAnimation (radius : number, srcPos : cc.Vec2, count : number, desPos : cc.Vec2) {
        let posArray : cc.Vec2[] = this.getPoint(radius, srcPos.x, srcPos.y, count)
        let jinbiNodeArray = new Array(); //金币节点和它的位置
        for (var i = 0; i < posArray.length; i++) {
            let jinbi : cc.Node = this.createJinbi(this.node)
            let randPos : cc.Vec2 = cc.v2(posArray[i].x + cc.math.randomRangeInt(0, 40) , 
                                            posArray[i].y + cc.math.randomRangeInt(0, 40))
            jinbi.setPosition(srcPos)
            jinbiNodeArray.push({jinbi,randPos})
        }
        const speed : number = 1000
        let jinbiTop : cc.Node = cc.find('Canvas/TopBar/jinbi/jinbi')

        if(!jinbiTop) {
            cc.error('lingqujinbi.ts, null node')
        }

        for(let i : number= 0; i < jinbiNodeArray.length; i++) {
            const pos = jinbiNodeArray[i].randPos
            const dist = Math.sqrt((pos.x - desPos.x) * (pos.x - desPos.x) + (pos.y - desPos.y) * (pos.y - desPos.y))
            const time : number = dist / speed
            let seq : cc.ActionInterval = cc.sequence(cc.moveTo(0.2, pos), cc.moveTo(time, desPos),
            cc.callFunc(function(target, _jinbiNode) {
                this.jinbiPool.put(_jinbiNode)
            }, this, jinbiNodeArray[i].jinbi),

            cc.callFunc(function(target) {
                    jinbiTop.runAction(cc.sequence(cc.scaleTo(0.03, 1.5), cc.scaleTo(0, 1)))
            }, this))

            jinbiNodeArray[i].jinbi.runAction(seq)
        }

    }

    createJinbi (parentNode : cc.Node) : cc.Node {
        let jinbiNode : cc.Node = null
        if (this.jinbiPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            jinbiNode = this.jinbiPool.get()
        } 
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            jinbiNode = cc.instantiate(this.jinbiPrefab)
        }
        //设置父节点
        jinbiNode.parent = parentNode
        return jinbiNode
    }

    /*
    * 求圆周上等分点的坐标
    * ox,oy为圆心坐标
    * r为半径
    * count为等分个数
    */
        getPoint(r: number, ox: number, oy: number, count: number) : cc.Vec2[] {
            let radians : number = (Math.PI / 180) * Math.round(360 / count) //弧度
            let point : cc.Vec2[] = Array<cc.Vec2> ()
            for(let i = 0; i < count; i++){
                let x : number = ox + r * Math.sin(radians * i);
                let y : number = oy + r * Math.cos(radians * i);
    
                //point.unshift({x:x,y:y}); //为保持数据顺时针
                point.unshift(cc.v2(x, y))
            }
            return point
        }
    // update (dt) {}
}
