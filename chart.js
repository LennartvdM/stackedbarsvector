// SVG chart rendering class
class SVGChart {
    constructor(containerId, data, params) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.params = params;
        this.svg = null;
        this.render();
    }

    render() {
        // Clear previous content
        this.container.innerHTML = '';
        
        // Get container dimensions
        const rect = this.container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        this.renderChart(width, height);
        this.container.appendChild(this.svg);
    }

    renderChart(width, height) {
        const { data, params } = this;
        const items = data.items;
        
        // Calculate layout
        const titleHeight = 30;
        const scaleHeight = 25;
        const headerHeight = titleHeight + scaleHeight;
        const availableHeight = height - headerHeight - params.padding * 2;
        const rowHeight = params.barHeight + params.barSpacing;
        const totalContentHeight = items.length * rowHeight - params.barSpacing;
        
        // Auto-adjust if content doesn't fit
        let actualBarHeight = params.barHeight;
        let actualSpacing = params.barSpacing;
        
        if (totalContentHeight > availableHeight) {
            const ratio = availableHeight / totalContentHeight;
            actualBarHeight = Math.max(15, params.barHeight * ratio);
            actualSpacing = Math.max(2, params.barSpacing * ratio);
        }
        
        const actualRowHeight = actualBarHeight + actualSpacing;
        
        // Layout constants
        const labelWidth = width * 0.6;
        const chartStartX = labelWidth + 20;
        const chartWidth = width - chartStartX - params.padding;
        const colWidth = chartWidth / 4;
        
        // Title
        this.addText(params.padding, params.padding + 20, data.title, {
            fontSize: 16 * params.fontScale,
            fontWeight: '600',
            fill: '#076c97',
            className: 'svg-title'
        });
        
        // Scale numbers
        for (let i = 1; i <= 4; i++) {
            const x = chartStartX + (i - 1) * colWidth + colWidth / 2;
            this.addText(x, params.padding + titleHeight + 18, i.toString(), {
                fontSize: 14 * params.fontScale,
                fontWeight: '600',
                fill: '#9cc2e4',
                textAnchor: 'middle',
                className: 'svg-number'
            });
        }
        
        // Grid lines
        for (let i = 0; i <= 4; i++) {
            const x = chartStartX + i * colWidth;
            this.addLine(x, headerHeight + params.padding, x, height - params.padding, {
                stroke: '#D0D0D0',
                strokeWidth: 1,
                className: 'grid-line'
            });
        }
        
        // Chart items
        items.forEach((item, index) => {
            const y = headerHeight + params.padding + index * actualRowHeight;
            
            // Bricks
            for (let brick = 1; brick <= item.score; brick++) {
                const x = chartStartX + (brick - 1) * colWidth;
                this.addRect(x, y, colWidth, actualBarHeight, {
                    className: `brick${brick}`
                });
            }
            
            // Label
            this.renderLabel(item.label, labelWidth, y, actualBarHeight);
            
            // Divider
            if (index < items.length - 1) {
                const dividerY = y + actualBarHeight + actualSpacing / 2;
                const centerX = labelWidth / 2;
                this.addLine(centerX - 60, dividerY, centerX + 60, dividerY, {
                    stroke: '#D0D0D0',
                    strokeWidth: 1,
                    className: 'divider-line'
                });
            }
        });
    }

    renderLabel(text, maxWidth, y, height) {
        const fontSize = 10 * this.params.fontScale;
        const lineHeight = fontSize * this.params.lineHeight;
        const lines = this.wrapText(text, maxWidth - 40, fontSize);
        
        const totalTextHeight = lines.length * lineHeight;
        const startY = y + height / 2 - totalTextHeight / 2 + lineHeight / 2;
        
        lines.forEach((line, index) => {
            this.addText(maxWidth / 2, startY + index * lineHeight, line, {
                fontSize,
                fill: '#595959',
                textAnchor: 'middle',
                dominantBaseline: 'middle',
                className: 'svg-text'
            });
        });
    }

    wrapText(text, maxWidth, fontSize) {
        // Rough character width estimation
        const charWidth = fontSize * 0.6;
        const maxChars = Math.floor(maxWidth / charWidth);
        
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (testLine.length <= maxChars) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    }

    addText(x, y, text, options = {}) {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        textElement.textContent = text;
        
        Object.entries(options).forEach(([key, value]) => {
            textElement.setAttribute(key, value);
        });
        
        this.svg.appendChild(textElement);
        return textElement;
    }

    addLine(x1, y1, x2, y2, options = {}) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        
        Object.entries(options).forEach(([key, value]) => {
            line.setAttribute(key, value);
        });
        
        this.svg.appendChild(line);
        return line;
    }

    addRect(x, y, width, height, options = {}) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        
        Object.entries(options).forEach(([key, value]) => {
            rect.setAttribute(key, value);
        });
        
        this.svg.appendChild(rect);
        return rect;
    }
} 