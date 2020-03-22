import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface Props {
  children: Object;
  isOpen?: boolean;
  label: String;
  id: number;
  onClick: () => void;
}

class AccordionSection extends React.Component<Props> {
  render() {
    const { isOpen, label, onClick, id } = this.props;
    let sectionClass = '';

    if (id === 1) {
      sectionClass = 'second-section';
    }

    return (
      <div className={`AccordionSection ${isOpen ? 'flex-section' : ''}`}>
        <div onClick={onClick} className={`header ${isOpen ? 'expanded' : ''}`}>
          <div className="header-container">
            <p>{label}</p>
            <div className="header-icon">
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${isOpen ? 'rotate-open' : 'rotate-closed'}`}
              />
            </div>
          </div>
        </div>

        <div className={`content ${isOpen ? sectionClass : 'hidden'}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AccordionSection;
