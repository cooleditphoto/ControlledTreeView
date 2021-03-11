import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Button from "@material-ui/core/Button";
import { useEffect } from 'react';
import axios from "axios";

export default function ControlledTreeView() {
  const sampledata = [{
    id: "0",
    name: "FeatureA",
    children: [
      {
        id: "3",
        name: "Sub-feature-A1"
      },
      {
        id: "4",
        name: "Sub-feature-A2",
        children: [
          {
            id: "5",
            name: "Sub-feature-A2-1",
            price: 50
          },
          {
            id: "6",
            name: "Sub-feature-A2-2",
            price: 25
          },

        ]
      },
      {
        id: "7",
        name: "Sub-feature-A3"
      }
    ]
  },
  {
    id: "1",
    name: "FeatureB",
  },
  {
    id: "2",
    name: "FeatureC"
  }
  ];

  const [selected, setSelected] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const [pricemap, setPricemap] = React.useState(new Map())
  const [data, setData] = React.useState(new Object());


  useEffect(() => {
    /**
    axios
      .get(
        '/items'
      )
      .then((response) => {
        setData(response.data)
    //    updatePriceMap(response.data)
   //   })
   //   .catch((error) => {
     //   console.log("get price map error ", error);
     // });
     */

    setData(sampledata)
    updatePriceMap(sampledata)
  }, []);

  const updatePriceMap = (data) => {

    for (const treeitem of data) {

      if (treeitem.price != null) {
        setPricemap(new Map(pricemap.set(treeitem.id, treeitem.price)));

      }
      else if (treeitem.children != null) {
        updatePriceMap(treeitem.children);
      }
    }

  };

  const renderParentTree = (nodes) => (
    <div className="treeItems">{Array.isArray(nodes)
      ? nodes.map(node => renderTree(node))
      : null}
    </div>
  );

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onLabelClick={event => handleSelect(event, nodes.id)}    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </TreeItem>
  );


  const handleToggle = (event, nodeIds) => {
    if (event.target.nodeName !== "svg") {
      return;
    }
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    const nodeId = nodeIds[0];
    console.log(nodeId)
    console.log([...selected])
    let newselected = selected;
    if (selected.includes(nodeId)) {
      console.log("include")
      newselected = selected.filter(id => id !== nodeId);
      setSelected(newselected);
    } else {
      let oldArray = selected
      setSelected(oldArray => [...oldArray, nodeId]);
      newselected = [...oldArray, nodeId];
    }

    let newprice = 0;
    console.log([...newselected])

    for (const s of newselected) {

      if (pricemap.get(s) != null) {
        newprice = newprice + pricemap.get(s)
      }
    }
    setPrice(newprice);
    console.log(newprice)


  };

  const saveSelected = () => {
    axios.post('/items', { "selected": selected, "price": price })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div >
      <h1>Subscription Preferences</h1>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        selected={selected}
        expanded={expanded}
        onNodeToggle={handleToggle}
        multiSelect
      >
        {renderParentTree(data)}
      </TreeView>
      <div className="price">
        Total amount {price}

      </div>
      <Button className="CanvasClick"
        variant="contained"
        color="primary"
        onClick={saveSelected}
      >
        save
                </Button>

    </div>
  );
}
