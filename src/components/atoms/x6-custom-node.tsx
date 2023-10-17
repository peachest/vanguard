import {Graph, Node} from "@antv/x6" ;
import {JSX}         from "react" ;
import {register}    from "@antv/x6-react-shape" ;

export const X6ReactNode = ({node}: { node: Node; graph: Graph }): JSX.Element => {
    console.log(JSON.stringify(node, undefined, 2)) ;
    return (
        <div style={{
            border         : "1px solid",
            height         : "100%",
            display        : "flex",
            justifyContent : "center",
            alignItems     : "center",
            backgroundColor: "rgba(255, 0, 0)",
        }}>
            hello world
        </div>
    ) ;
} ;

register({
             shape    : "custom-react-node",
             component: X6ReactNode,
             width    : 100,
             height   : 100,
             attrs    : {
                 body: {
                     stroke     : "#8f8f8f",
                     strokeWidth: 1,
                     fill       : "#fff",
                     rx         : 6,
                     ry         : 6,
                 },
             },
             ports    : {
                 groups: {
                     bottom: {
                         position: {
                             name: "bottom",
                         },
                     },
                     left  : {
                         position: {
                             name: "left",
                         },
                     },
                     right : {
                         position: {
                             name: "right",
                         },
                     },
                     top   : {
                         position: {
                             name: "top",
                         },
                     },
                 },
             },
         }) ;
