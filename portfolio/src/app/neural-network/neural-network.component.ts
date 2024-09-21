import { NgIf } from '@angular/common';
import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  // x and y will be provided by the simulation
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
}

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.css'],
  imports: [NgIf],
  standalone: true
})
export class NeuralNetworkComponent implements OnInit {

  constructor(private container: ElementRef) { }

  ngOnInit(): void {
    this.createNeuralNetwork();
  }

  createNeuralNetwork(): void {
    const layers = [3, 5, 4, 2]; // Example layer configuration
    const width = this.container.nativeElement.offsetWidth || 800;
    const height = 600;

    const svg = d3.select(this.container.nativeElement)
      .select('.network-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const nodes: Node[] = [];
    const links: Link[] = [];

    // Generate nodes with initial positions
    layers.forEach((layerSize, layerIndex) => {
      const x = (layerIndex + 1) * (width / (layers.length + 1));

      for (let i = 0; i < layerSize; i++) {
        const y = (i + 1) * (height / (layerSize + 1));
        const node: Node = { id: `n${layerIndex}-${i}`, x, y };
        nodes.push(node);
        console.log(x);
        console.log(y);

        if (layerIndex > 0) {
          const prevLayerSize = layers[layerIndex - 1];
          for (let j = 0; j < prevLayerSize; j++) {
            const sourceNode = nodes.find(n => n.id === `n${layerIndex - 1}-${j}`);
            
            const randomAdd:Boolean = Math.random() < 0.5; 

            if (sourceNode && randomAdd) {
              links.push({ source: sourceNode, target: node });
            }
          }
        }
      }
    });

    // Create simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('link', d3.forceLink<Node, Link>(links).distance(200).strength(0.2).id(d => d.id))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX().strength(0.1))
      .force('y', d3.forceY().strength(0.1))
      .on('tick', ticked);

    // Draw links
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#cccccc')
      .attr('stroke-width', 1);

    // Draw nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .attr('fill', '#61dafb')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 16)
          .attr('fill', '#21a1f1');
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 12)
          .attr('fill', '#61dafb');
      });

    // Update positions on each tick
    function ticked() {
      link
        .attr('x1', d => d.source.x!)
        .attr('y1', d => d.source.y!)
        .attr('x2', d => d.target.x!)
        .attr('y2', d => d.target.y!);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
    }

    // Drag event handlers
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }
}
