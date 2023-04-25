/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider, { SliderTypeMap } from '@mui/material/Slider';
import {ExtendSliderUnstyled} from '@mui/base/SliderUnstyled';
import {darken} from "@mui/material";
import { ComponentProps } from 'react';

const CustomizedSlider = styled<ExtendSliderUnstyled<SliderTypeMap<"span", {}>>>(
  (props: ComponentProps<ExtendSliderUnstyled<SliderTypeMap<"span", {}>>>) => (
    <Slider slotProps={{ thumb: { className: 'thumb' } }} {...props} />
))`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .thumb {
    border-radius: 1px;
  }
`;

const CustomizedSlider2 = styled(Slider)(
    ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);


export default function StyledComponentsDeep() {
    return (
        <div>
            <Slider defaultValue={30} />
            <CustomizedSlider defaultValue={30} />
        </div>
    );
}


