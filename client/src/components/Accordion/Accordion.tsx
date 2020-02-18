import React from 'react';
import AccordionSection from './AccordionSection';

interface Props {
  children: any[];
  sections: String[];
}

interface State {
  openSection: number;
}

class Accordion extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      openSection: 0 // Sets first section to open by default
    };
  }

  onClick = (id: number) => {
    this.setState({
      openSection: id
    });
  };

  render() {
    const { children, sections } = this.props;
    const { openSection } = this.state;

    return (
      <div className="Accordion">
        {children.map((child, id) => (
          <AccordionSection
            key={id}
            isOpen={openSection === id}
            label={sections[id]}
            onClick={() => this.onClick(id)}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

export default Accordion;
