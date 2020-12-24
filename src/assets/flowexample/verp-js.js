
//https://www.jquerycards.com/uncategorised/jquery-flowchart/
$(document).ready(function () {
    var $flowchart = $('#example_9');
    var $container = $flowchart.parent();

    var cx = $flowchart.width() / 2;
    var cy = $flowchart.height() / 2;


    // Panzoom initialization...
    $flowchart.panzoom();

    // Centering panzoom
    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);

    // Panzoom zoom handling...
    var possibleZooms = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];
    var currentZoom = 2;
    $container.on('mousewheel.focal', function (e) {
        e.preventDefault();
        var delta = (e.delta || e.originalEvent.wheelDelta) || e.originalEvent.detail;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, (currentZoom + (zoomOut * 2 - 1))));
        $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);
        $flowchart.panzoom('zoom', possibleZooms[currentZoom], {
            animate: false,
            focal: e
        });
    });
    /*
    var data = {
      operators: {
        operator1: {
          top: cy - 100,
          left: cx - 200,
          properties: {
            title: 'Operator 1',
            inputs: {},
            outputs: {
              output_1: {
                label: 'Output 1',
              }
            }
          }
        },
        operator2: {
          top: cy,
          left: cx + 140,
          properties: {
            title: 'Operator 2',
            inputs: {
              input_1: {
                label: 'Input 1',
              },
              input_2: {
                label: 'Input 2',
              },
            },
            outputs: {}
          }
        },
      },
      links: {
        link_1: {
          fromOperator: 'operator1',
          fromConnector: 'output_1',
          toOperator: 'operator2',
          toConnector: 'input_2',
        },
      }
    };*/

    var operators = {};
    var links = {};

    verpData.AffectObjects.forEach(obj => {
        obj.LevelLeft = 0;
    });

    verpData.AffectObjects.forEach(obj => {
        var isLevel1 = true;
        verpData.AffectObjects.forEach(pobj => {
            if (pobj.Children) {
                if (pobj.Children.find(c => c.ObjectKey == obj.ObjectKey)) {
                    isLevel1 = false;
                }
            }
        });

        if (isLevel1) {
            obj.LevelLeft = 1;
        }
    });

    var maxLevelLeft = 1;
    for (var i = 2; i <= verpData.AffectObjects.length; i++) {
        verpData.AffectObjects
            .filter(o => o.LevelLeft == i - 1)
            .forEach(o => {
                if (o.Children) {
                    o.Children.forEach(c => {
                        var obj = verpData.AffectObjects.find(a => a.ObjectKey == c.ObjectKey);
                        if (obj) {
                            obj.LevelLeft = i;
                            maxLevelLeft = i;
                        }
                    })
                }
            })
    }

    verpData.AffectObjects
        .forEach(o => {
            if (o.LevelLeft == 1 && o.Children) {
                o.LevelLeft = verpData.AffectObjects.length + 1;

                o.Children.forEach(c => {
                    var obj = verpData.AffectObjects.find(a => a.ObjectKey == c.ObjectKey);
                    if (obj && o.LevelLeft > obj.LevelLeft - 1) {
                        o.LevelLeft = obj.LevelLeft - 1;
                    }
                })
            }
        })

    function calValidData(init) {
        verpData.AffectObjects.forEach(obj => {

            var inputLength = 0;
            var inputs = {};

            var totalInput = 0;
            var inLinks = [];
            verpData.AffectObjects.forEach(pobj => {
                if (pobj.Children) {
                    pobj.Children.forEach(c => {
                        if (c.ObjectKey == obj.ObjectKey) {
                            var link = {
                                parentObjKey: pobj.ObjectKey,
                                label: pobj.ObjectCode
                            };
                            inputs['from_' + pobj.ObjectKey] = link;
                            inLinks.push(link);
                            totalInput += c.NewTransferProductUnitConversionQuantity;
                            inputLength++;
                        }
                    })
                }
            });

            var objectType = {
                InventoryDetail: 'InventoryDetail',
                Package: 'Package'
            };

            inLinks.forEach(l => {
                var parentObj = verpData.AffectObjects.find(o => o.ObjectKey == l.parentObjKey);
                if (parentObj) {
                    if (parentObj.ObjectTypeId == objectType.Package) {
                        if (inputLength == 1) {
                            l.label = 'Tách từ ' + parentObj.ObjectCode;
                        } else {
                            l.label = 'Gộp từ ' + parentObj.ObjectCode;
                        }
                    } else {
                        l.label = 'Nhập từ ' + parentObj.ObjectCode;
                    }

                    if (obj.ObjectTypeId == objectType.InventoryDetail && !obj.IsRoot) {
                        l.label = 'Xuất từ ' + parentObj.ObjectCode;
                    }
                }

                
            })


            if (inputLength > 0)
                obj.NewProductUnitConversionQuantity = totalInput;



            var cssClass = '';
            switch (obj.ObjectTypeId) {
                case objectType.InventoryDetail:
                    cssClass += ' object-inventory';
                    break;
                case objectType.Package:
                    cssClass += ' object-package';
                    break;
            }
            if (obj.IsRoot) {
                cssClass += ' root-tree';
            }

            var title = obj.ObjectCode;
            if (totalInput > 0 && obj.NewProductUnitConversionQuantity != obj.OldProductUnitConversionQuantity) {
                cssClass += ' data-changed';
                title = obj.ObjectCode + ' (*)';
            }
            if (!init) {
                var operatorData = $flowchart.flowchart('getOperatorData', obj.ObjectKey);
                operatorData.properties.class = cssClass;
                operatorData.properties.title = title;
                operatorData.properties.tip = obj.NewProductUnitConversionQuantity;
                $flowchart.flowchart('setOperatorData', obj.ObjectKey, operatorData);
            }




            var outputLength = 0;
            var outputs = {};
            var totalOutput = 0;

            var outLinks = [];
            var isInvalid = false;
            if (obj.Children) {
                obj.Children.forEach(c => {
                    outputs['to_' + c.ObjectKey] = {
                        label: '' + c.NewTransferProductUnitConversionQuantity//Xuất 
                    }
                    outputLength++;
                    totalOutput += c.NewTransferProductUnitConversionQuantity;

                    var linkName = obj.ObjectKey + '|' + c.ObjectKey;
                    var link = {
                        name: linkName,
                        isEditable: c.IsEditable,
                        fromOperator: obj.ObjectKey,
                        fromConnector: 'to_' + c.ObjectKey,
                        toOperator: c.ObjectKey,
                        toConnector: 'from_' + obj.ObjectKey,
                        color: c.IsEditable ? '#339933' : '#000'
                    }
                    if (c.IsEditable && totalInput < totalOutput) {
                        isInvalid = true;
                    }
                    links[linkName] = link;
                    outLinks.push(link);
                });
            }

            if (isInvalid) {
                outLinks.forEach(l => {
                    if (!init) {
                        console.log('link ' + totalInput + '<' + totalOutput, l.name)
                        $flowchart.flowchart('setLinkMainColor', l.name, '#cc0000');
                    }
                    l.color = '#cc0000';
                })
            } else {
                outLinks.forEach(l => {
                    if (l.isEditable) {
                        if (!init)
                            $flowchart.flowchart('setLinkMainColor', l.name, '#339933');
                        l.color = '#339933';
                    } else {
                        if (!init)
                            $flowchart.flowchart('setLinkMainColor', l.name, '#000');
                        l.color = '#000';
                    }
                })
            }

            obj.Inputs = inputs;
            obj.Outputs = outputs;
            obj.class = cssClass;

            obj.InputOutputRowsLength = Math.max(inputLength, outputLength);
        });

        if (!init) {
            var newData = $flowchart.flowchart('getData');
            $flowchart.flowchart('setData', newData);
        }
    };

    calValidData(true);

    var titleHeight = 50;
    var bodyHeight = 60;
    var marginTop = 10;
    var rowHeight = 25;
    console.log('AffectObjects', verpData.AffectObjects)
    var levelHeights = [0];
    for (var i = 1; i <= verpData.AffectObjects.length; i++) {
        levelHeights[i] = 0;
        verpData.AffectObjects.filter(o => o.LevelLeft == i).forEach(o => {

            var inputOutputRowsHeight = o.InputOutputRowsLength * rowHeight;
            levelHeights[i] += titleHeight + bodyHeight + marginTop + inputOutputRowsHeight;
        });
    }
    console.log(levelHeights)
    var maxHeight = Math.max(...levelHeights);
    console.log('max', maxHeight)
    for (var i = 1; i <= verpData.AffectObjects.length; i++) {

        var sameLevel = verpData.AffectObjects.filter(o => o.LevelLeft == i);
        if (sameLevel && sameLevel.length > 0) {
            var avg = maxHeight * 1.0 / sameLevel.length;
            console.log('avg' + i, avg)
            var index = 0;
            sameLevel.forEach(o => {
                var inputOutputRowsHeight = o.InputOutputRowsLength * rowHeight;
                var itemHeight = titleHeight + bodyHeight + marginTop + inputOutputRowsHeight;
                o.LevelTop = (index * avg) + (avg - itemHeight) / 2;

                index++;
            });
        }
    }

    $('#example_9').height(20 + maxHeight);
    $('#example_9').width(20 + maxLevelLeft * 300);
    operators = {};
    verpData.AffectObjects.forEach(obj => {
        operators[obj.ObjectKey] = {
            top: 10 + obj.LevelTop,
            left: 10 + (obj.LevelLeft - 1) * 300,
            properties: {
                title: obj.ObjectCode,
                tip: obj.NewProductUnitConversionQuantity,
                inputs: obj.Inputs,
                outputs: obj.Outputs,
                class: obj.class
            }
        }
    });



    var data = {
        operators: operators,
        links: links
        // links: {
        //     link_1: {
        //         fromOperator: 'operator1',
        //         fromConnector: 'output_1',
        //         toOperator: 'operator2',
        //         toConnector: 'input_2',
        //     },
        // }
    };
    console.log(data);


    // Apply the plugin on a standard, empty div...
    $flowchart.flowchart({
        canUserEditLinks: false,
        data: data,
        onLinkSelect: function (linkId) {
            //alert(linkId);
            var objKeys = linkId.split('|');
            var parentObjKey = objKeys[0];
            var childObjKey = objKeys[1];
            var parentObj = verpData.AffectObjects.find(o => o.ObjectKey == parentObjKey);
            var childObj = verpData.AffectObjects.find(o => o.ObjectKey == childObjKey);
            var transferObj = parentObj.Children.find(c => c.ObjectKey == childObjKey);
            if (!transferObj.IsEditable)
                return false;
            var oldV = transferObj.NewTransferProductUnitConversionQuantity;
            var v = prompt('Chỉnh sửa số lượng', oldV);
            if (v) {
                transferObj.NewTransferProductUnitConversionQuantity = parseFloat(v);
                var operatorData = $flowchart.flowchart('getOperatorData', parentObjKey);
                console.log(operatorData)
                operatorData.properties.outputs['to_' + childObjKey].label = v;//'Xuất '
                $flowchart.flowchart('setOperatorData', parentObjKey, operatorData);
                calValidData();
            }
            return false;
        }
    });

    $flowchart.parent().siblings('.delete_selected_button').click(function () {
        $flowchart.flowchart('deleteSelected');
    });


    var $draggableOperators = $('.draggable_operator');

    function getOperatorData($element) {
        var nbInputs = parseInt($element.data('nb-inputs'));
        var nbOutputs = parseInt($element.data('nb-outputs'));
        var data = {
            properties: {
                title: $element.text(),
                inputs: {},
                outputs: {}
            }
        };

        var i = 0;
        for (i = 0; i < nbInputs; i++) {
            data.properties.inputs['input_' + i] = {
                label: 'Input ' + (i + 1)
            };
        }
        for (i = 0; i < nbOutputs; i++) {
            data.properties.outputs['output_' + i] = {
                label: 'Output ' + (i + 1)
            };
        }

        return data;
    }

    var operatorId = 0;

    $draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,

        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,

        helper: function (e) {
            var $this = $(this);
            var data = getOperatorData($this);
            return $flowchart.flowchart('getOperatorElement', data);
        },
        stop: function (e, ui) {
            var $this = $(this);
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left &&
                elOffset.top > containerOffset.top &&
                elOffset.left < containerOffset.left + $container.width() &&
                elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart('getPositionRatio');
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;

                var data = getOperatorData($this);
                data.left = relativeLeft;
                data.top = relativeTop;

                $flowchart.flowchart('addOperator', data);
            }
        }
    });


});