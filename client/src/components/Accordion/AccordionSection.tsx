import React from 'react';

export interface Props {
  children: Object;
  isOpen?: boolean;
  label: String;
  onClick: () => void;
}

class AccordionSection extends React.Component<Props> {
  render() {
    const { isOpen, label, onClick } = this.props;

    return (
      <div className="AccordionSection">
        <div onClick={onClick} className="accordion-section-header">
          {label}
          <div style={{ float: 'right' }}>
            {!isOpen && <span>&#9650;</span>}
            {isOpen && <span>&#9660;</span>}
          </div>
        </div>
        {isOpen && (
          <div className={'accordion-section-content'}>
            {this.props.children}
          </div>
        )}
        {/* <div className={`accordion-section-content ${isOpen ? '' : 'hidden'}`}>
          {this.props.children}
        </div> */}
      </div>
    );
  }
}

export default AccordionSection;
