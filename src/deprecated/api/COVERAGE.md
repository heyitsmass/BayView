```
=================================================== test session starts ===================================================
platform linux -- Python 3.11.5, pytest-7.4.3, pluggy-1.3.0 -- /BayPI/bin/python3
cachedir: .pytest_cache
rootdir: /BayPI/src/test
plugins: cov-4.1.0
collected 67 items

test_errors.py::TestErrors::test_ActionLookupError PASSED                                                           [  1%]
test_loop.py::TestHeartbeat::test_start_stop PASSED                                                                 [  2%]
test_loop.py::TestHeartbeat::test_set_interval PASSED                                                               [  4%]
test_loop.py::TestHeartbeat::test_set_name PASSED                                                                   [  5%]
test_loop.py::TestHeartbeat::test__start PASSED                                                                     [  7%]
test_routes.py::TestRoutes::test_test PASSED                                                                        [  8%]
test_routes.py::TestRoutes::test_cached PASSED                                                                      [ 10%]
test_routes.py::TestRoutes::test_memo PASSED                                                                        [ 11%]
test_routes.py::TestRoutes::test_get_tickets PASSED                                                                 [ 13%]
test_routes.py::TestRoutes::test_get_blockout_dates PASSED                                                          [ 14%]
test_routes.py::TestRoutes::test_get_dining_availability PASSED                                                     [ 16%]
test_routes.py::TestRoutes::test_get_calendar PASSED                                                                [ 17%]
test_routes.py::TestRoutes::test_get_resort_tickets PASSED                                                          [ 19%]
test_routes.py::TestRoutes::test_get_parks PASSED                                                                   [ 20%]
test_routes.py::TestRoutes::test_get_passes PASSED                                                                  [ 22%]
test_utils.py::TestUtils::test_create_password PASSED                                                               [ 23%]
test_utils.py::TestUtils::test_fmt_date PASSED                                                                      [ 25%]
drivers/test_api.py::TestAPI::test_request PASSED                                                                   [ 26%]
drivers/test_api.py::TestAPI::test_status PASSED                                                                    [ 28%]
drivers/test_api.py::TestAPI::test_get_parks PASSED                                                                 [ 29%]
drivers/test_api.py::TestAPI::test_get_passes PASSED                                                                [ 31%]
drivers/test_api.py::TestAPI::test_get_tickets PASSED                                                               [ 32%]
drivers/test_api.py::TestAPI::test_get_calendar PASSED                                                              [ 34%]
drivers/test_api.py::TestAPI::test_get_resort_tickets PASSED                                                        [ 35%]
drivers/test_api.py::TestAPI::test_get_blockout_dates PASSED                                                        [ 37%]
drivers/test_api.py::TestAPI::test_get_dining_availability PASSED                                                   [ 38%]
drivers/test_api.py::TestAPI::test_get_profile PASSED                                                               [ 40%]
drivers/test_auth.py::TestAuthManager::test_status PASSED                                                           [ 41%]
drivers/test_auth.py::TestAuthManager::test_is_expired PASSED                                                       [ 43%]
drivers/test_auth.py::TestAuthManager::test_is_secure PASSED                                                        [ 44%]
drivers/test_auth.py::TestAuthManager::test_is_logged_in PASSED                                                     [ 46%]
drivers/test_auth.py::TestAuthManager::test_is_authenticated PASSED                                                 [ 47%]
drivers/test_auth.py::TestAuthManager::test_client_token PASSED                                                     [ 49%]
drivers/test_auth.py::TestAuthManager::test_bearer_auth PASSED                                                      [ 50%]
drivers/test_auth.py::TestAuthManager::test_refresh PASSED                                                          [ 52%]
drivers/test_cookies.py::TestCookieStore::test_load PASSED                                                          [ 53%]
drivers/test_cookies.py::TestCookieStore::test_save PASSED                                                          [ 55%]
drivers/test_cookies.py::TestCookieStore::test_clear PASSED                                                         [ 56%]
drivers/test_cookies.py::TestCookieStore::test_get PASSED                                                           [ 58%]
drivers/test_cookies.py::TestCookieStore::test_update PASSED                                                        [ 59%]
drivers/test_cookies.py::TestCookieStore::test_delete PASSED                                                        [ 61%]
drivers/test_cookies.py::TestCookieStore::test_exists PASSED                                                        [ 62%]
drivers/test_otp.py::TestEmailDriver::test_init PASSED                                                              [ 64%]
drivers/test_otp.py::TestEmailDriver::test__get_otp PASSED                                                          [ 65%]
drivers/test_otp.py::TestEmailDriver::test_get_max_uid PASSED                                                       [ 67%]
drivers/test_otp.py::TestEmailDriver::test_get_uids PASSED                                                          [ 68%]
drivers/test_otp.py::TestEmailDriver::test_refresh PASSED                                                           [ 70%]
drivers/test_otp.py::TestEmailDriver::test_get_emails PASSED                                                        [ 71%]
drivers/test_otp.py::TestEmailDriver::test_search_string PASSED                                                     [ 73%]
drivers/test_otp.py::TestEmailDriver::test_get_otp PASSED                                                           [ 74%]
drivers/test_web.py::TestDriver::test_dispatch PASSED                                                               [ 76%]
drivers/test_web.py::TestDriver::test__handle_pw_form PASSED                                                        [ 77%]
drivers/test_web.py::TestDriver::test__handle_change_pw_form PASSED                                                 [ 79%]
drivers/test_web.py::TestDriver::test__get_visible_element PASSED                                                   [ 80%]
drivers/test_web.py::TestDriver::test__is_displayed PASSED                                                          [ 82%]
drivers/test_web.py::TestDriver::test__is_visible PASSED                                                            [ 83%]
drivers/test_web.py::TestDriver::test__get_element PASSED                                                           [ 85%]
drivers/test_web.py::TestDriver::test__wait_for_element PASSED                                                      [ 86%]
drivers/test_web.py::TestDriver::test__reload PASSED                                                                [ 88%]
drivers/test_web.py::TestDriver::test__current_header_xpath PASSED                                                  [ 89%]
drivers/test_web.py::TestDriver::test__login PASSED                                                                 [ 91%]
drivers/test_web.py::TestDriver::test__handle_login_form PASSED                                                     [ 92%]
drivers/test_web.py::TestDriver::test__handle_otp_form PASSED                                                       [ 94%]
drivers/test_web.py::TestDriver::test_submit PASSED                                                                 [ 95%]
drivers/test_web.py::TestDriver::test__wait_for_element_invisible PASSED                                            [ 97%]
drivers/test_web.py::TestDriver::test__handle_popup PASSED                                                          [ 98%]
drivers/test_web.py::TestDriver::test__load_preconditions PASSED                                                    [100%]

---------- coverage: platform linux, python 3.11.5-final-0 -----------
Name                                              Stmts   Miss  Cover
---------------------------------------------------------------------
/home/brandon/BayPI/src/lib/__init__.py               0      0   100%
/home/brandon/BayPI/src/lib/abc.py                  175      0   100%
/home/brandon/BayPI/src/lib/app.py                   16      1    94%
/home/brandon/BayPI/src/lib/drivers/__init__.py       0      0   100%
/home/brandon/BayPI/src/lib/drivers/api.py          137     14    90%
/home/brandon/BayPI/src/lib/drivers/auth.py          43      2    95%
/home/brandon/BayPI/src/lib/drivers/cookies.py       38      3    92%
/home/brandon/BayPI/src/lib/drivers/otp.py           70      3    96%
/home/brandon/BayPI/src/lib/drivers/web.py          195     25    87%
/home/brandon/BayPI/src/lib/errors.py                 3      0   100%
/home/brandon/BayPI/src/lib/loop.py                  52      4    92%
/home/brandon/BayPI/src/lib/routes.py                53      0   100%
/home/brandon/BayPI/src/lib/utils.py                 23      4    83%
---------------------------------------------------------------------
TOTAL                                               805     56    93%

============================================= 67 passed in 567.83s (0:09:27) ==============================================
```
