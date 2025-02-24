'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { transform } from '@babel/standalone'

// Utility to generate a unique class name
export function generateUniqueClassName() {
    return `dynamic-component-${Math.random().toString(36).substring(2, 9)}`;
  };
  
// Utility to inject scoped CSS
export function injectScopedCSS(cssString: string, uniqueClassName: string) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = cssString
        .split('}')
        .map((rule) => rule.trim())
        .filter((rule) => rule)
        .map((rule) => `.${uniqueClassName} ${rule}}`)
        .join(' ');
    document.head.appendChild(styleElement);
};

export function executeCode(codeString: string, uniqueClassName: string) {
    try {
        // Transpile the code string using Babel
        const transpiledCode = transform(codeString, {
            presets: ['react'],
        })?.code

        if (!transpiledCode) {
            throw new Error('Transpiling failed')
        }
        
        return new Function(
            'React',
            'uniqueClassName',
            'useState',
            'useEffect',
            `return ${transpiledCode}`
        )(
            React,
            uniqueClassName,
            useState,
            useEffect,
        );
    } catch (error) {
        console.error('Error transpiling or rendering code:', error);
    }
  };