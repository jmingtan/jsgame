import com.sun.jna.Library;
import com.sun.jna.Native;

public interface Chipmunk extends Library {
	Chipmunk INSTANCE = (Chipmunk) Native.loadLibrary("chipmunk", Chipmunk.class);

	void cpInitChipmunk();
}
