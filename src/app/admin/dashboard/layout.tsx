'use client'
import { ReactNode } from "react";
import './layout.css';
import React, { useState } from 'react';
import Image from 'next/image';
import img from "../../../../public/images/baymax.png";
import { faServer,faUser, faBoxArchive, faPeopleGroup, faHouse, faPhone, faTerminal, faCloud, faClipboard, faFingerprint, faEye, faKeyboard, faLaptop, faCubes, faDatabase, faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";


interface Section {
    id: string;
    icon: IconDefinition;
    label: string;
    content: { icons: string[]
        iconMap: {[x:string]: IconDefinition}
    }
}


const sections: Section[] = [
{
    id: 'database',
    icon: faDatabase,
    label: ' Database',
    content: {
    icons: ['Users', 'Guilds', 'Archive'],
    iconMap: {
        Users: faUser,
        Guilds: faPeopleGroup,
        Archive: faBoxArchive,
        },
    },
},
{
    id: 'bot',
    icon: faRobot,
    label: ' Bot',
    content: {
    icons: ['Embed', 'Commands', 'EndPoints', 'Logs'],
    iconMap: {
        Embed: faCubes,
        Commands: faTerminal,
        EndPoints: faCloud,
        Logs: faClipboard,
        },
    },
},
{
    id: 'api',
    icon: faServer,
    label: ' API',
    content: {
    icons: ['Status', 'EndPoints', 'IAM', 'Console', 'Logs'],
    iconMap: {
        Status: faEye,
        EndPoints: faLaptop,
        IAM: faFingerprint,
        Console: faKeyboard,
        Logs: faClipboard,
        },
    },
},
];


export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='dashboard'>
          <div className='Border'>
            <div className='title'>
                <Image src={img} alt="Baymax" width={75} height={75}/>
                <h1>Bayview
                Admin Dashboard
                </h1>
            </div>
    
            {sections.map((section, i) => (
              <DropDown key={i} {...section} />
            ))}
          </div>
        </div>
      );
    }
    
    type DropDownProps = Section;
    
    const DropDown = ({ ...props }: DropDownProps) => {
      const { id, label, content, icon } = props;
    
      const [open, setOpen] = useState(false);
    
      return (
        <div key={id}>
          <button className='collapsible' onClick={(e?: SyntheticEvent) => { e?.preventDefault(); setOpen(!open); }} >
            <FontAwesomeIcon icon={icon} />
            {label}
          </button>
    
          <div className={`content ${open ? "open" : ""}`}>
            {open && content.icons.map((item, i) => (
                <SelectOption key={i} icon={content.iconMap[item]}>
                  {item}
                </SelectOption>
              ))}
          </div>
        </div>
      );
    };
    
    type SelectOptionProps = {
      children: string;
      icon: IconDefinition;
    };
    
    const SelectOption = ({ ...props }: SelectOptionProps) => {
      const { children } = props;
    
      return (
        <span key={children}>
          <FontAwesomeIcon icon={props.icon} />
    
          <button className='clickable-content' onClick={() => alert(`Clicked on ${children})`)} >
            {children}
          </button>
        </span>
      );
    
}
