"use client";
import React, { useState } from 'react';
import { CustomService } from '@/src/custom';
import { HttpService } from '@nestjs/axios';

const httpService: HttpService = new HttpService();
const customService: CustomService = new CustomService(httpService);

function extractLinksFromCode(code: any) {
  const regex = /(https:\/\/shope\.ee\/\w+)/g;
  const matches = code.match(regex);
  return matches;
}

export default function MyComponent() {
  
  const [textValue, setTextValue] = useState('');
  const [copiedValue, setCopiedValue] = useState('');

  const handleTextareaChange = (event: any) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const handleButtonClick = () => {
    const links = extractLinksFromCode(textValue);
    const a = customService.newLink('https://shope.ee/6fJXbrZLQC');
    a.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.error(error);
    });
    setCopiedValue(textValue);
  };

  return (
    <div>
      <textarea
        value={textValue}
        onChange={handleTextareaChange}
        placeholder="Nhập thông tin vào đây"
        style={{ color: 'black', height: '50vh', width: '50vw' }}
      ></textarea>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleButtonClick}
          style={{ border: '1px solid black', padding: '10px 20px' }}
        >
          Chuyển đổi
        </button>
      </div>
      <textarea
        value={copiedValue}
        readOnly
        placeholder="Thông tin mới"
        style={{ color: 'black', height: '50vh', width: '50vw' }}
      ></textarea>
    </div>
  );
}