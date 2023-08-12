import { Button, Card, CardContent, Container, FormControlLabel, FormGroup, Stack, Switch, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { showFooterLayoutAction, showHeaderLayoutAction, useLayoutState } from 'src/shared/layout';
import { useAppDispatch } from 'src/app/store';
import { localization } from 'src/shared/localization';
import { ColorModeContext } from 'src/ui/hooks/useThemeSelector';
import { PageContainer } from 'src/ui/components/Layout';

export const ConfigurationPage: React.FC = () => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const [checkedHeader, setCheckedHeader] = useState(layoutState.header.isVisible);
  const [checkedFooter, setCheckedFooter] = useState(layoutState.footer.isVisible);

  const colorMode = React.useContext(ColorModeContext);

  const handleButtonDarkTheme =() =>
  {
    colorMode.setTheme('dark');
  }

  const handleButtonLightTheme =() =>
  {
    colorMode.setTheme('light');
  }  

  const handleHideHeader =(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
  {
    setCheckedHeader(checked);
    dispatch(showHeaderLayoutAction(checked));
  }    

  const handleHideFooter =(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
  {
    setCheckedFooter(checked);
    dispatch(showFooterLayoutAction(checked));
  }  

  return (
    <PageContainer>
      <Card sx={{mt: '4em'}}>
        <CardContent>
          <Typography variant='h6' mb={2} >
            {localization.configuration.theme}
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <Button variant='contained' color='primary' onClick={handleButtonDarkTheme}> {localization.configuration.themeDark}</Button>
            <Button variant='contained' color='secondary' onClick={handleButtonLightTheme}>{localization.configuration.themeLight}</Button>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{mt: '1em'}}>
        <CardContent>
          <Typography variant='h6' mb={2} >
            {localization.configuration.viewParams}
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <FormGroup>
              <FormControlLabel control={<Switch checked={checkedHeader} onChange={handleHideHeader} />} label={localization.configuration.showHeader} />
              <FormControlLabel control={<Switch checked={checkedFooter} onChange={handleHideFooter} />} label={localization.configuration.showFooter}  />
            </FormGroup>
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
};