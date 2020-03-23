export interface Activity {
  name: String;
  type: String;
}

export interface BActivity extends Activity {
  occurrence: number;
  completed: number;
}

export interface UBActivity extends Activity {
  duration: String;
}
