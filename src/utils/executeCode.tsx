'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { transform } from '@babel/standalone'

export function executeCode(codeString: string) {
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
            'useState',
            'useEffect',
            `return ${transpiledCode}`
        )(
            React,
            useState,
            useEffect,
        );
    } catch (error) {
        console.error('Error transpiling or rendering code:', error);
    }
  };