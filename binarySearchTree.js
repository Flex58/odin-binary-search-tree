const node = (value) => {
    return {
        data: value,
        left: null,
        right: null
    }
}

const getSortedAndUnqiue = (arr) => {
    arr.sort((a,b) => a - b)
    let unique = [...new Set(arr)]
    return unique;
}

class Tree{
    constructor(array){
        this.root = this.buildTree(array)
        }
    
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null
    
        let mid = start +  Math.floor((end - start) / 2)
    
        let root = node(arr[mid])
    
        root.left = this.buildTree(arr, start, mid - 1)
    
        root.right = this.buildTree(arr, mid + 1, end)
    
        return root;
    }

    insert(value){
        let index = this.root
        while (index) {
            if (value < index.data) {
                if (!index.left) {
                    index.left = node(value)
                    return
                }
                index = index.left
            } 
            else if(value > index.data){
                if (!index.right) {
                    index.right = node(value)
                    return
                }
                index = index.right
            }
            else {
                return 
            }
        }
    }

    remove(value) {
        let index = this.root

        if (index.data == value) {
            let pointer = index.right
                while (pointer.left) {
                    pointer = pointer.left
                }   
            this.remove(pointer.data)
            index.data = pointer.data
            return
        }
        
        while(index) {
            if(index.left.data == value || index.right.data == value) {

                let tempIndex = index.left.data == value ? index.left : index.right
                
                //if no children/leaf
                if (!tempIndex.left && !tempIndex.right) {
                    index.left.data == value ? index.left = null : index.right = null
                    return
                }

                //if two children 
                else if (tempIndex.left && tempIndex.right) {
                    let pointer = tempIndex.right
                    while (pointer.left) {
                        pointer = pointer.left
                    }
                   
                    this.remove(pointer.data)
                    
                    index.left.data == value ? index.left.data = pointer.data : index.right.data = pointer.data
                    
                    return
                }

                //if one child
                else if (tempIndex.left || tempIndex.right){
                    let pointer = tempIndex.left ? tempIndex.left : tempIndex.right
                    index.left.data == value ? index.left = pointer : index.right = pointer
                    return
                }
            }

            if(value < index.data) {
                index = index.left
            } else if (value > index.data) {
                index = index.right
            }
        }
        return null;
    }

    find(value) {
        let index = this.root

        while (index) {
            if (value < index.data) {
                index = index.left
            } else if (value > index.data) {
                index = index.right
            } else {
                return index
            }
        }
    }

    levelOrder(callback, queue = new Array) {

        if (!queue[0]) {
            queue.push(this.root)
        }
    
        if (!callback) throw new Error("callback required")
        
        callback(queue[0])
        if (queue[0].left != null) {
            queue.push(queue[0].left)
        }
        
        if (queue[0].right) {
            queue.push(queue[0].right)
        }

        queue.shift()

        if (queue[0]) {
            this.levelOrder(callback, queue)
        }
    }

    inOrder(callback, node = this.root) {
        //left -> data -> right
        if (node == null) return

        if (!callback) throw new Error("callback required")

        this.inOrder(callback, node.left)

        callback(node)

        this.inOrder(callback, node.right)
    }

    preOrder(callback, node = this.root) {
        //data  -> left -> right
        if (node == null) return

        if (!callback) throw new Error("callback required")

        callback(node)

        this.preOrder(callback, node.left)

        this.preOrder(callback, node.right)
    }

    postOrder(callback, node = this.root) {
        //left  -> right -> data
        if (node == null) return

        if (!callback) throw new Error("callback required")

        this.postOrder(callback, node.left)

        this.postOrder(callback, node.right)

        callback(node)
    }
    
    depth(node, root = this.root) {
        let count = -1

        if (root == null) return -1

        if (root.data == node || (count = this.depth(node, root.left)) >= 0 || (count = this.depth(node, root.right)) >= 0 ){
            return count + 1
        }

        return count;
    }

    heightHelper(root = this.root) {

        if (root == null) {
            return 0
        }

        let left = this.heightHelper(root.left)
        let right = this.heightHelper(root.right)

       if (left > right) {
        return left + 1
       } else {
        return right + 1
       }
    }

    height(node) {
        let depth = this.depth(node)
        let height = this.heightHelper()
        return height - depth - 1
    }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
arr = getSortedAndUnqiue(arr)
let tree = new Tree(arr)
prettyPrint(tree.root)