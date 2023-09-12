import { Button, Card, CardContent, FormControlLabel, FormGroup, Stack, Switch, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { showFooterUserLayoutAction, showHeaderUserLayoutAction, useLayoutState } from 'src/app/layout';
import { useAppDispatch } from 'src/app/store';
import { ColorModeContext } from 'src/app/theme';
import { localization } from 'src/resources/localization';
import { PageContainer } from 'src/ui/components/Layout';

export const UserSettingsPage: React.FC = () => 
{
  const theme = useTheme();
  const layoutState = useLayoutState();
  const dispatch = useAppDispatch();

  const [checkedHeader, setCheckedHeader] = useState(layoutState.header.isVisibleUser);
  const [checkedFooter, setCheckedFooter] = useState(layoutState.footer.isVisibleUser);

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
    dispatch(showHeaderUserLayoutAction(checked));
  }    

  const handleHideFooter =(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
  {
    setCheckedFooter(checked);
    dispatch(showFooterUserLayoutAction(checked));
  }  

  return (
    <PageContainer>
      <Card>
        <CardContent>
          <Typography variant='h6' mb={2} >
            {localization.settings.theme}
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <Button variant='contained' color='primary' onClick={handleButtonDarkTheme}> {localization.settings.themeDark}</Button>
            <Button variant='contained' color='secondary' onClick={handleButtonLightTheme}>{localization.settings.themeLight}</Button>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{mt: '1em'}}>
        <CardContent>
          <Typography variant='h6' mb={2} >
            {localization.settings.viewParams}
          </Typography>
          <Stack spacing={2} direction={'column'} >
            <FormGroup>
              <FormControlLabel control={<Switch checked={checkedHeader} onChange={handleHideHeader} />} label={localization.settings.showHeader} />
              <FormControlLabel control={<Switch checked={checkedFooter} onChange={handleHideFooter} />} label={localization.settings.showFooter}  />
            </FormGroup>
          </Stack>
        </CardContent>
      </Card>
    </PageContainer>
  );
};