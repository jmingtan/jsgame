import com.sun.jna.Library;
import com.sun.jna.Native;

public class POSIX {
	public interface Posix extends Library {
		public int chmod(String filename, int mode);
		public int chown(String filename, int user, int group);
		public int rename(String oldpath, String newpath);
		public int kill(int pid, int signal);
		public int link(String oldpath, String newpath);
		public int mkdir(String path, int mode);
		public int rmdir(String path);
	}

	public static void main(String args[]) {
		Posix posix = (Posix) Native.loadLibrary("c", Posix.class);
		posix.mkdir("temp", 0777);
	}
}
